import APP_CONFIG from "../../../app.config";
export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  totalNodes: number = 0

  id: string | number;
  degree: number = 0;
  label: string

  weight?: number
  rol?: string
  level?: number;
  expandStatus?: 'success' | 'empty';
  isSelected?: boolean = false;
  isExpanded?: boolean = false;
  popover: PopoverNode

  constructor(id: string | number, totalNodes: number, label: string, popover: PopoverNode, weight?: number, rol?: string, level?: number) {
    this.id = id;
    this.totalNodes = totalNodes
    this.label = label
    this.popover = popover
    this.weight = weight
    this.level = level
  }

  normal = () => {
    return Math.sqrt(this.degree / (this.totalNodes || 1));
  }

  get r() {
    if (this.weight) {
      if (this.totalNodes <= 50) {
        return Math.sqrt(this.weight) * 50
      } else if (this.totalNodes <= 100) {
        return Math.sqrt(this.weight) * 42
      } else if (this.totalNodes <= 150) {
        return Math.sqrt(this.weight) * 35
      } else if (this.totalNodes <= 200) {
        return Math.sqrt(this.weight) * 28
      } else {
        return 0
      }
    } else {
      return this.normal() === 0 ? 110 : 55 * this.normal() + 65;
    }
  }

  get fontSize() {
    if (this.weight) {
      if (this.totalNodes <= 50) {
        return Math.max(16, Math.sqrt(this.weight) * 14) + 'px'
      } else if (this.totalNodes <= 100) {
        return Math.max(15, Math.sqrt(this.weight) * 11) + 'px'
      } else if (this.totalNodes <= 150) {
        return Math.max(14, Math.sqrt(this.weight) * 9) + 'px'
      } else {
        return Math.max(13, Math.sqrt(this.weight) * 7) + 'px'
      }
    } else {
      const baseSize = 16 + Math.round(this.normal() * 10); // Garantiza al menos 16px para nodos secundarios y hasta 26px para centrales
      return (this.label.length > 20 ? Math.max(15, baseSize - 1) : baseSize) + 'px';
    }
  }

  get color() {
    // Si el nodo fue expandido, su estado tiene prioridad visual
    if (this.expandStatus === 'success') {
      return '#ca8a04'; // Dorado oro formal: se expandió y aportó nuevos coautores
    }
    if (this.expandStatus === 'empty') {
      return '#991b1b'; // Rojo borgoña formal: se expandió pero no se encontraron nuevos coautores
    }

    if (this.level !== undefined) {
      if (this.level === 0) return '#111827'; // Negro / Gris muy oscuro para el autor central (Hop 0)
      if (this.level === 1) return '#ea580c'; // Naranja vibrante para colaboradores directos (Hop 1)
      if (this.level === 2) return '#7c3aed'; // Violeta para red expandida de 2do grado (Hop 2)
      if (this.level === 3) return '#2563eb'; // Azul Zafiro para red de 3er grado (Hop 3)
      if (this.level === 4) return '#059669'; // Verde Esmeralda para red de 4to grado (Hop 4)
      if (this.level === 5) return '#0891b2'; // Turquesa / Cyan para red de 5to grado (Hop 5)
      if (this.level === 6) return '#db2777'; // Magenta para red de 6to grado (Hop 6)
      return '#4f46e5';                       // Índigo para expansiones de 7mo grado en adelante (Hop 7+)
    }
    let index = Math.ceil((this.degree * (APP_CONFIG.SPECTRUM.length - 1)) / Math.max(1, (this.totalNodes - 1)))
    return APP_CONFIG.SPECTRUM[index] || '#4b5563';
  }
}

export interface PopoverNode {
  enablePopover: boolean
  title?: string
  content?: string
  link?: string
  expandable?: boolean
  onExpand?: () => void
  onSelect?: () => void
}
