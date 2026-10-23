import { Component, Input } from '@angular/core';
import {
  faArrowDown,
  faArrowUp,
  faBuildingColumns,
  faEye,
  faMinus,
  faScaleBalanced,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { RecommendedProfile } from '../../../domain/entities/team-recommendation.interface';

export interface CandidateBadge {
  label: string;
  tooltip: string;
  icon: IconDefinition;
  classes: string;
}

/** Tarjeta de un candidato recomendado: rango, movimiento vs. línea base, relevancia y badges. */
@Component({
  selector: 'app-recommended-candidate-card',
  templateUrl: './recommended-candidate-card.component.html',
  styleUrls: ['./recommended-candidate-card.component.css'],
})
export class RecommendedCandidateCardComponent {
  @Input({ required: true }) candidate!: RecommendedProfile;
  /** Con el re-ranking desactivado no se muestra el movimiento respecto a la línea base. */
  @Input() fairnessEnabled = true;

  readonly faBuildingColumns = faBuildingColumns;
  readonly faArrowUp = faArrowUp;
  readonly faArrowDown = faArrowDown;
  readonly faMinus = faMinus;

  get displayName(): string {
    return this.candidate.name?.trim() || `Autor Scopus ${this.candidate.author_id}`;
  }

  get initials(): string {
    const letters = this.displayName
      .replace(/[^\p{L}\s-]/gu, ' ')
      .split(/[\s-]+/)
      .filter((part) => part.length > 0)
      .map((part) => part[0].toUpperCase());
    return letters.slice(0, 2).join('') || '?';
  }

  /** Posiciones ganadas (>0) o perdidas (<0) frente al orden por relevancia pura. */
  get movement(): number {
    return this.candidate.baseline_rank - this.candidate.rank;
  }

  get movementLabel(): string {
    const steps = Math.abs(this.movement);
    if (steps === 0) {
      return 'Sin cambio';
    }
    const noun = steps === 1 ? 'puesto' : 'puestos';
    return this.movement > 0 ? `Sube ${steps} ${noun}` : `Baja ${steps} ${noun}`;
  }

  get movementIcon(): IconDefinition {
    if (this.movement > 0) {
      return faArrowUp;
    }
    return this.movement < 0 ? faArrowDown : faMinus;
  }

  /** Relevancia normalizada (0–100) dentro del grupo de candidatos K-NN. */
  get relevancePercent(): number {
    const value = Number.isFinite(this.candidate.relevance_norm)
      ? this.candidate.relevance_norm
      : 0;
    return Math.round(Math.min(1, Math.max(0, value)) * 100);
  }

  get badges(): CandidateBadge[] {
    const badges: CandidateBadge[] = [];
    if (this.candidate.low_visibility) {
      badges.push({
        label: 'Baja visibilidad',
        tooltip: 'Perfil con pocas publicaciones o coautorías en el corpus (grupo protegido).',
        icon: faEye,
        classes: 'bg-amber-50 text-amber-800 ring-amber-200',
      });
    }
    if (this.candidate.selection_reason === 'quota') {
      badges.push({
        label: 'Priorizado por equidad',
        tooltip:
          'Promovido por la cuota mínima de perfiles de baja visibilidad del re-ranking R1 (20 %).',
        icon: faScaleBalanced,
        classes: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
      });
    }
    if (this.candidate.selection_reason === 'cap_relaxed') {
      badges.push({
        label: 'Cupo institucional relajado',
        tooltip: 'Se superó el tope de 3 investigadores por institución por falta de candidatos.',
        icon: faSitemap,
        classes: 'bg-sky-50 text-sky-800 ring-sky-200',
      });
    }
    return badges;
  }
}
