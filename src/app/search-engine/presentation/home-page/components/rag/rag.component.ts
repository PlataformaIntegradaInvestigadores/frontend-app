export class RagComponent {
  searchValue: any = null;
  setSearch: any;
  topicsLoaded = false;
  words = [];
  provinces = [];

  showSummaryOverlay = false;

onSearch(event: { query: string; option: string }) {
  this.searchValue = event;
  this.showSummaryOverlay = (event.option === 'mrau'); // solo para 'mrau'
}

  hideSummaryOverlay() {
    this.showSummaryOverlay = false;
  }

  isAuthorSearch() {
    return this.searchValue?.option === 'au';
  }
}