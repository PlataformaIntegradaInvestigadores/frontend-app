export interface Group {
    id: string;
    title: string;
    description: string;
    owner?: string; // Este campo puede ser opcional y quemado en el frontend por ahora
    phase?: string; // Este campo también puede ser opcional y quemado
    admin_id: string;
    users: string[]; //id de los usuarios miembros del grupo
  }
  
