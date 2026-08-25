import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { of, throwError } from 'rxjs';
import { CoauthorsGraphComponent } from './coauthors-graph.component';
import { AuthorService } from '../../../../domain/services/author.service';
import { Author, AuthorNode, CoauthorInfo } from '../../../../../shared/interfaces/author.interface';

describe('CoauthorsGraphComponent', () => {
  let component: CoauthorsGraphComponent;
  let authorServiceSpy: jasmine.SpyObj<AuthorService>;

  const author: Author = {
    scopus_id: 1,
    initials: 'AB',
    first_name: 'Ana',
    last_name: 'Bar',
  } as Author;

  const makeNode = (over: Partial<AuthorNode> = {}): AuthorNode =>
    ({ scopus_id: '2', initials: 'CD', first_name: 'Carl', last_name: 'Diaz', ...over }) as AuthorNode;

  const coauthors: CoauthorInfo = {
    data: {
      nodes: [makeNode()],
      links: [{ source: '1', target: '2', collabStrength: 2 } as any],
    },
  };

  beforeEach(() => {
    authorServiceSpy = jasmine.createSpyObj('AuthorService', ['getCoauthorsById']);
    authorServiceSpy.getCoauthorsById.and.returnValue(of(coauthors));

    TestBed.configureTestingModule({
      declarations: [CoauthorsGraphComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthorService, useValue: authorServiceSpy },
        { provide: DOCUMENT, useValue: document },
      ],
    });
    component = TestBed.createComponent(CoauthorsGraphComponent).componentInstance;
    component.author = author;
    // downloadEl (@ViewChild) never resolves without a rendered template; several methods
    // dereference it directly, so stub it with a "no graph svg yet" DOM fake — mirrors the
    // pattern established for MostRelevantAuthorsGraphComponent in batch 22.
    (component as any).downloadEl = { nativeElement: { querySelector: () => null } };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('builds nodes/links, marks the graph shown, and expands the root node', () => {
      component.ngOnInit();
      expect(component.d3Nodes.length).toBe(2); // author + 1 coauthor
      expect(component.showGraph).toBeTrue();
      expect(component.loading).toBeFalse();
      expect(component.expandedNodeIds.has('1')).toBeTrue();
      const root = component.d3Nodes.find((n) => String(n.id) === '1');
      expect(root?.isExpanded).toBeTrue();
    });

    it('adds a synthetic root node when the author is absent from the API nodes', () => {
      component.ngOnInit();
      expect(component.apiNodes.some((n) => String(n.scopus_id) === '1')).toBeTrue();
    });

    it('does not duplicate the root node when the author is already present', () => {
      const withSelf: CoauthorInfo = {
        data: { nodes: [makeNode({ scopus_id: '1' }), makeNode({ scopus_id: '2' })], links: [] },
      };
      authorServiceSpy.getCoauthorsById.and.returnValue(of(withSelf));
      component.ngOnInit();
      expect(component.apiNodes.filter((n) => String(n.scopus_id) === '1').length).toBe(1);
    });

    it('flags no graph shown when there are zero coauthors', () => {
      authorServiceSpy.getCoauthorsById.and.returnValue(of({ data: { nodes: [], links: [] } }));
      component.ngOnInit();
      expect(component.showGraph).toBeFalse();
    });

    it('hides the graph and clears loading on failure', () => {
      authorServiceSpy.getCoauthorsById.and.returnValue(throwError(() => new Error('boom')));
      component.ngOnInit();
      expect(component.showGraph).toBeFalse();
      expect(component.loading).toBeFalse();
    });
  });

  it('toggleLegend flips the flag', () => {
    component.showLegend = true;
    component.toggleLegend();
    expect(component.showLegend).toBeFalse();
  });

  describe('showNotification', () => {
    it('sets message/type and auto-clears after the timer', (done) => {
      component.showNotification('hi', 'warning');
      expect(component.notificationMessage).toBe('hi');
      expect(component.notificationType).toBe('warning');
      setTimeout(() => {
        expect(component.notificationMessage).toBeNull();
        done();
      }, 3250);
    }, 4000);

    it('defaults to type "info"', () => {
      component.showNotification('hi');
      expect(component.notificationType).toBe('info');
    });

    it('clears a pending timer before starting a new one', () => {
      const clearSpy = spyOn(window, 'clearTimeout').and.callThrough();
      component.showNotification('first');
      component.showNotification('second');
      expect(clearSpy).toHaveBeenCalled();
    });
  });

  describe('truncarCadena', () => {
    it('truncates at the earlier of a space or dash', () => {
      expect(component.truncarCadena('Ana Maria')).toBe('Ana');
      expect(component.truncarCadena('Jean-Paul')).toBe('Jean');
    });

    it('truncates at a space when no dash exists', () => {
      expect(component.truncarCadena('Ana Maria Perez')).toBe('Ana');
    });

    it('truncates at a dash when no space exists', () => {
      expect(component.truncarCadena('Jean-Paul-Marc')).toBe('Jean');
    });

    it('returns the text unchanged with neither separator', () => {
      expect(component.truncarCadena('Ana')).toBe('Ana');
    });
  });

  it('getIndexByScopusId finds a matching node index', () => {
    component.ngOnInit();
    // apiNodes order is [coauthor '2' from the API, synthetic root '1' pushed last], so
    // setupNodes() builds d3Nodes in that same order: '2' at index 0, '1' at index 1.
    expect(component.getIndexByScopusId('2')).toBe(0);
    expect(component.getIndexByScopusId('1')).toBe(1);
    expect(component.getIndexByScopusId('missing')).toBe(-1);
  });

  describe('selectNode / closePanel / toggleShowAllCollaborators', () => {
    beforeEach(() => component.ngOnInit());

    it('does nothing while a region is being selected', () => {
      component.selectingRegion = true;
      component.selectNode('2');
      expect(component.selectedNode).toBeNull();
    });

    it('does nothing for an unknown node id', () => {
      component.selectNode('missing');
      expect(component.selectedNode).toBeNull();
    });

    it('selects the node, computes sorted collaborators, and marks it selected', () => {
      // Select the root node ('1', the author) — its one collaborator is coauthor '2'.
      component.selectNode('1');
      expect(component.selectedNode?.author.scopus_id).toBe(1);
      expect(component.selectedNode?.collaborators.length).toBe(1);
      expect(component.selectedNode?.collaborators[0].id).toBe('2');
      expect(component.d3Nodes.find((n) => String(n.id) === '1')?.isSelected).toBeTrue();
    });

    it('resets showAllCollaborators unless preserveShowAll is set', () => {
      component.showAllCollaborators = true;
      component.selectNode('1', true);
      expect(component.showAllCollaborators).toBeTrue();

      component.showAllCollaborators = true;
      component.selectNode('1');
      expect(component.showAllCollaborators).toBeFalse();
    });

    it('closePanel clears selection and deselects nodes', () => {
      component.selectNode('1');
      component.closePanel();
      expect(component.selectedNode).toBeNull();
      expect(component.d3Nodes.every((n) => !n.isSelected)).toBeTrue();
    });

    it('toggleShowAllCollaborators flips the flag', () => {
      component.showAllCollaborators = false;
      component.toggleShowAllCollaborators();
      expect(component.showAllCollaborators).toBeTrue();
    });
  });

  describe('isNodeExpanded', () => {
    it('reflects whether the id is in expandedNodeIds', () => {
      component.expandedNodeIds.add('5');
      expect(component.isNodeExpanded('5')).toBeTrue();
      expect(component.isNodeExpanded('6')).toBeFalse();
    });
  });

  describe('onPanelExpandNetwork', () => {
    it('expands the selected node author', () => {
      component.ngOnInit();
      component.selectNode('2');
      spyOn(component, 'expandGraph');
      component.onPanelExpandNetwork();
      expect(component.expandGraph).toHaveBeenCalledWith('2');
    });

    it('does nothing without a selected node', () => {
      spyOn(component, 'expandGraph');
      component.onPanelExpandNetwork();
      expect(component.expandGraph).not.toHaveBeenCalled();
    });
  });

  describe('expandGraph', () => {
    beforeEach(() => component.ngOnInit());

    it('does nothing when already expanded or already expanding', () => {
      component.expandedNodeIds.add('2');
      component.expandGraph('2');
      expect(authorServiceSpy.getCoauthorsById).toHaveBeenCalledTimes(1); // only from ngOnInit

      component.expanding = true;
      component.expandGraph('new-id');
      expect(authorServiceSpy.getCoauthorsById).toHaveBeenCalledTimes(1);
    });

    it('adds new nodes/links and shows a success notification', () => {
      const expandResponse: CoauthorInfo = {
        data: {
          nodes: [makeNode({ scopus_id: '3' })],
          links: [{ source: '2', target: '3', collabStrength: 1 } as any],
        },
      };
      authorServiceSpy.getCoauthorsById.and.returnValue(of(expandResponse));

      component.expandGraph('2');

      expect(component.d3Nodes.some((n) => String(n.id) === '3')).toBeTrue();
      expect(component.notificationType).toBe('success');
      expect(component.expanding).toBeFalse();
      expect(component.expandedNodeIds.has('2')).toBeTrue();
    });

    it('shows a warning notification when no new coauthors are found', () => {
      authorServiceSpy.getCoauthorsById.and.returnValue(
        of({ data: { nodes: [], links: [] } } as CoauthorInfo),
      );
      component.expandGraph('2');
      expect(component.notificationType).toBe('warning');
    });

    it('skips a node already present and a link with an unknown endpoint', () => {
      const expandResponse: CoauthorInfo = {
        data: {
          nodes: [makeNode({ scopus_id: '2' })], // already exists
          links: [{ source: '2', target: 'ghost', collabStrength: 1 } as any],
        },
      };
      authorServiceSpy.getCoauthorsById.and.returnValue(of(expandResponse));
      component.expandGraph('2');
      expect(component.notificationType).toBe('warning');
    });

    it('skips a duplicate link (either direction) between two existing nodes', () => {
      const expandResponse: CoauthorInfo = {
        data: {
          nodes: [makeNode({ scopus_id: '3' })],
          links: [
            { source: '1', target: '2', collabStrength: 9 } as any, // duplicate of ngOnInit's link
          ],
        },
      };
      authorServiceSpy.getCoauthorsById.and.returnValue(of(expandResponse));
      const linksBefore = component.d3Links.length;
      component.expandGraph('2');
      expect(component.d3Links.length).toBe(linksBefore);
    });

    it('re-selects the currently selected node after expanding, preserving showAllCollaborators', () => {
      component.selectNode('2');
      authorServiceSpy.getCoauthorsById.and.returnValue(
        of({ data: { nodes: [], links: [] } } as CoauthorInfo),
      );
      const selectSpy = spyOn(component, 'selectNode').and.callThrough();
      component.expandGraph('2');
      expect(selectSpy).toHaveBeenCalledWith('2', true);
    });

    it('reverts expanded state and shows an error notification on failure', () => {
      spyOn(console, 'error');
      authorServiceSpy.getCoauthorsById.and.returnValue(throwError(() => new Error('boom')));
      component.expandGraph('2');
      expect(component.expanding).toBeFalse();
      expect(component.expandedNodeIds.has('2')).toBeFalse();
      expect(component.notificationType).toBe('error');
    });
  });

  describe('downloadDataUrl', () => {
    it('creates a temporary link, clicks it, and removes it', () => {
      const appendSpy = spyOn(document.body, 'appendChild').and.callThrough();
      const removeSpy = spyOn(document.body, 'removeChild').and.callThrough();
      component.downloadDataUrl('data:image/png;base64,x', 'graph.png');
      expect(appendSpy).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalled();
    });
  });

  describe('region selection', () => {
    it('toggleRegionSelect flips state and clears region data', () => {
      component.regionStart = { x: 1, y: 1 };
      component.regionRect = { x: 1, y: 1, w: 5, h: 5 };
      component.toggleRegionSelect();
      expect(component.selectingRegion).toBeTrue();
      expect(component.regionStart).toBeNull();
      expect(component.regionRect).toBeNull();
    });

    it('onRegionMouseDown starts a zero-size rect at the click point', () => {
      const el = { getBoundingClientRect: () => ({ left: 10, top: 20 }) };
      component.onRegionMouseDown({ currentTarget: el, clientX: 30, clientY: 50 } as any);
      expect(component.regionStart).toEqual({ x: 20, y: 30 });
      expect(component.regionRect).toEqual({ x: 20, y: 30, w: 0, h: 0 });
    });

    it('onRegionMouseMove grows the rect from the start point', () => {
      const el = { getBoundingClientRect: () => ({ left: 0, top: 0 }) };
      component.onRegionMouseDown({ currentTarget: el, clientX: 10, clientY: 10 } as any);
      component.onRegionMouseMove({ currentTarget: el, clientX: 40, clientY: 60 } as any);
      expect(component.regionRect).toEqual({ x: 10, y: 10, w: 30, h: 50 });
    });

    it('onRegionMouseMove does nothing without a start point', () => {
      component.regionStart = null;
      const el = { getBoundingClientRect: () => ({ left: 0, top: 0 }) };
      component.onRegionMouseMove({ currentTarget: el, clientX: 40, clientY: 60 } as any);
      expect(component.regionRect).toBeNull();
    });

    it('onRegionMouseUp clears state without exporting a too-small region', () => {
      component.regionRect = { x: 0, y: 0, w: 2, h: 2 };
      component.selectingRegion = true;
      component.onRegionMouseUp();
      expect(component.selectingRegion).toBeTrue();
      expect(component.regionStart).toBeNull();
      expect(component.regionRect).toBeNull();
    });

    it('onRegionMouseUp exits selection mode for a large-enough region (export is a no-op without a graph svg)', () => {
      component.regionRect = { x: 0, y: 0, w: 20, h: 20 };
      component.selectingRegion = true;
      component.onRegionMouseUp();
      expect(component.selectingRegion).toBeFalse();
    });
  });

  describe('zoom controls without a bound graph element', () => {
    // onDownloadGraph is intentionally not exercised here: unlike zoomIn/zoomOut/resetZoom
    // (which all early-return via getSvgAndZoom's null checks), it unconditionally schedules
    // a real htmlToImage.toPng() call after a 450ms setTimeout regardless of downloadEl state,
    // which would reject asynchronously against whatever unrelated test happens to be running
    // by then — confirmed via a real "Unhandled promise rejection" polluting later tests.
    it('zoomIn/zoomOut/resetZoom are safe no-ops when there is no graph SVG', () => {
      expect(() => component.zoomIn()).not.toThrow();
      expect(() => component.zoomOut()).not.toThrow();
      expect(() => component.resetZoom()).not.toThrow();
    });
  });
});
