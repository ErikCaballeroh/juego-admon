import type { GameLevel, Question } from '../types/game'

const pmbokIntro: Record<string, Question> = {
    q1: {
        text: '¿Cuál es el principal propósito del PMBOK?',
        options: ['Ser una guía formal de buenas prácticas', 'Dictar reglas inquebrantables de desarrollo', 'Ser una metología puramente ágil', 'Documentar código de programación'],
        correctIndex: 0,
    },
    q2: {
        text: '¿Cuántos grupos de procesos principales rigen al PMBOK?',
        options: ['1', '3', '5', '7'],
        correctIndex: 2,
    },
    q3: {
        text: '¿Cuál de los siguientes NO es un grupo de procesos del PMBOK?',
        options: ['Inicio', 'Cierre', 'Ágil y Adaptativo', 'Ejecución'],
        correctIndex: 2,
    },
    q4: {
        text: '¿Cómo se le conoce a la triple restricción de los proyectos?',
        options: ['Programación, Bases de Datos, Pruebas', 'Tiempo, Costo, Alcance', 'ScrumMaster, Developers, ProductOwner', 'Inicio, Mantenimiento, Fin'],
        correctIndex: 1,
    },
    q5: {
        text: '¿Qué rol fundamental tiene una PMO (Oficina de Dirección de Proyectos)?',
        options: ['Programar el código del sistema', 'Dirigir toda la compañía comercialmente', 'Estandarizar procesos de gobernanza de proyectos y facilitar herramientas o recursos', 'Entregar requerimientos escritos al cliente'],
        correctIndex: 2,
    },
    q6: {
        text: 'Según el marco PMBOK, ¿Qué es un Portafolio?',
        options: ['Una carpeta de currículums de candidatos', 'Un grupo de proyectos o programas gestionados para alcanzar objetivos estratégicos', 'Un banco inerte de pruebas de control', 'Una cuenta bancaria depositada para gastos'],
        correctIndex: 1,
    },
}

const pmbokMiddle: Record<string, Question> = {
    q1: {
        text: '¿Cuántas áreas de conocimiento menciona el PMBOK 6ta Edición?',
        options: ['5', '8', '10', '12'],
        correctIndex: 2,
    },
    q2: {
        text: '¿Qué área se asegura que el proyecto incluya exclusivamente el trabajo requerido?',
        options: ['Gestión del Tiempo', 'Gestión de los Costos', 'Gestión de la Calidad', 'Gestión del Alcance'],
        correctIndex: 3,
    },
    q3: {
        text: '¿Quién es el principal responsable formal del éxito o fracaso del proyecto?',
        options: ['El Programador Líder', 'El Director/Gerente de Proyectos (PM)', 'El Cliente Solicitante', 'El Servidor de Producción'],
        correctIndex: 1,
    },
    q4: {
        text: '¿El Acta de Constitución del Proyecto (Project Charter) pertenece a qué grupo?',
        options: ['Iniciación', 'Planificación', 'Control', 'Gestión Temprana'],
        correctIndex: 0,
    },
    q5: {
        text: '¿Qué área se enfoca en garantizar que el proyecto se complete exclusivamente dentro del presupuesto aprobado?',
        options: ['Gestión de los Riesgos', 'Gestión de los Costos', 'Gestión de las Adquisiciones', 'Gestión del Tiempo'],
        correctIndex: 1,
    },
    q6: {
        text: '¿Qué área busca garantizar formalmente que el proyecto satisfaga las necesidades para las que fue emprendido?',
        options: ['Gestión de Riesgos', 'Gestión Financiera', 'Gestión de Calidad', 'Gestión del Alcance Temprano'],
        correctIndex: 2,
    },
}

const pmbokEnd: Record<string, Question> = {
    q1: {
        text: '¿Qué área de conocimiento se encarga de lidiar con las expectativas cruzadas?',
        options: ['Contrataciones', 'Recursos Humanos', 'Partes Interesadas (Stakeholders)', 'Riesgos Estructurales'],
        correctIndex: 2,
    },
    q2: {
        text: '¿Qué proceso se realiza exclusivamente en la fase de Ejecución?',
        options: ['Crear el cronograma', 'Dirigir y gestionar el trabajo del proyecto', 'Planificar auditorias de riesgos', 'Cierre anticipado del proyecto'],
        correctIndex: 1,
    },
    q3: {
        text: '¿Qué área incluye el subproceso de efectuar adquisiciones y firmas?',
        options: ['Finanzas y Bancos', 'Adquisiciones', 'Recursos Humanos Especializados', 'Monitoreo Técnico'],
        correctIndex: 1,
    },
    q4: {
        text: '¿Para qué sirve crear una EDT (Estructura de Desglose del Trabajo)?',
        options: ['Para aprobar la liquidación', 'Para diagramar bases de datos', 'Para dividir y subdividir el alcance general del proyecto', 'Para controlar licencias comerciales'],
        correctIndex: 2,
    },
    q5: {
        text: '¿Cuándo finaliza o se retira formalmente un riesgo del radar del proyecto?',
        options: ['Justo al identificarlo en el plan', 'Al cierre oficial definitivo o cuando materialmente deja de ser una amenaza latente', 'Nunca finaliza ninguna amenaza', 'Al inicio temprano de planificación'],
        correctIndex: 1,
    },
    q6: {
        text: 'El Aseguramiento de Calidad típicamente obedece al grupo de procesos de:',
        options: ['Iniciación Inicial', 'Ejecución Estricta', 'Planificación Teórica', 'Cierre Contable'],
        correctIndex: 1,
    },
}

const scrumIntro: Record<string, Question> = {
    q1: {
        text: '¿Cuáles son los tres roles oficiales descritos en la Guía de Scrum?',
        options: ['Jefe, Trabajador, Cliente', 'Manager, Desarrolladores, Tester QA', 'Líder Técnico, Programador, Especialista UX', 'Scrum Master, Product Owner, Desarrolladores'],
        correctIndex: 3,
    },
    q2: {
        text: '¿Cuál es la principal responsabilidad del Product Owner (Dueño del Producto)?',
        options: ['Redactar todo el código', 'Maximizar el valor del producto gestionando el Product Backlog', 'Despedir o sancionar al equipo', 'Configurar servidores y bases de datos'],
        correctIndex: 1,
    },
    q3: {
        text: '¿Cuál es el rol nuclear del Scrum Master?',
        options: ['Actuar como verdadero líder que sirve y elimina los obstáculos', 'Fungir como el Jefe que asigna tareas al milímetro', 'Aprobar o rechazar facturas y nóminas', 'Dictar la arquitectura técnica obligatoria'],
        correctIndex: 0,
    },
    q4: {
        text: '¿Qué tamaño máximo sugiere la Guía de Scrum (2020) para un Scrum Team (Equipo entero)?',
        options: ['Exactamente 5 personas, inquebrantable', 'No tiene ningún límite ni consideración', 'Típicamente de 10 personas o menos', 'Mínimo de 30 programadores full-stack'],
        correctIndex: 2,
    },
    q5: {
        text: '¿Quién es el único con potestad de decidir y estimar libremente el "Cómo" se trabajará o programará el entregable?',
        options: ['El Product Owner', 'El Inversionista Comercial', 'Los Desarrolladores (Developers)', 'El Scrum Master Autoritario'],
        correctIndex: 2,
    },
    q6: {
        text: '¿Qué valor esencial intrínseco de Scrum fomenta hablar abierta y francamente de los problemas tecnológicos reales?',
        options: ['Valor/Coraje (Courage)', 'Capital (Money)', 'Competitividad Interna', 'Riesgo Financiero Asumido'],
        correctIndex: 0,
    },
}

const scrumMiddle: Record<string, Question> = {
    q1: {
        text: '¿Qué es el "Product Backlog" (Pila de Producto)?',
        options: ['Una lista de errores resueltos en producción', 'La base de documentación estática', 'Un repositorio de Git local', 'Una lista ordenada y emergente de todo lo que se sabe que necesitará el producto'],
        correctIndex: 3,
    },
    q2: {
        text: '¿En qué consiste el "Sprint Backlog" (Pila del Sprint)?',
        options: ['Los elementos y tareas de código seleccionados y planeados estrictamente para el actual Sprint', 'Una lista infinita de todo lo que aún falta programar a largo plazo', 'El control de horas y descansos de los empleados técnicos', 'La base de datos de usuarios finales registrados el mismo mes'],
        correctIndex: 0,
    },
    q3: {
        text: '¿A qué debe estar siempre vinculado un "Incremento"?',
        options: ['Al manual de instalación', 'A un escalón utilizable y terminado alineado al Objetivo del Producto', 'A los commits subidos de la semana', 'Al contrato notarial del cliente'],
        correctIndex: 1,
    },
    q4: {
        text: '¿Qué ocurre obligatoriamente en el momento en el que un elemento cumple con la Definición de Terminado (DoD)?',
        options: ['Se despide a un programador por terminar rápido', 'Nace un nuevo Incremento con valor', 'Se cierra todo el presupuesto técnico', 'Deben organizarse vacaciones departamentales'],
        correctIndex: 1,
    },
    q5: {
        text: 'El Sprint Goal (Objetivo del Sprint) es un compromiso que forma parte indisoluble e integral de qué artefacto:',
        options: ['Estructura Desglose de Trabajo (WBS)', 'Product Backlog (Pila de Producto)', 'Sprint Backlog (Pila del Sprint)', 'Definición Legal de Terminado (Done)'],
        correctIndex: 2,
    },
    q6: {
        text: 'El Objetivo del Producto puntualiza el estado futuro estelar y es un compromiso adherido en exclusividad al:',
        options: ['Incremento Funcional', 'Sprint Diario Cíclico', 'Presupuesto Estratégico Multianual', 'Product Backlog (Pila de Producto)'],
        correctIndex: 3,
    },
}

const scrumEnd: Record<string, Question> = {
    q1: {
        text: '¿Cuál es una directriz obligatoria del "Daily Scrum" (Scrum Diario)?',
        options: ['Es un evento formal para los Desarrolladores que dura un máximo de 15 minutos', 'Debe involucrar al cliente externo e inversionistas siempre', 'Consiste en resolver errores críticos reportados en la última hora', 'Puede saltarse o cancelarse si el código compila sin alertas visuales'],
        correctIndex: 0,
    },
    q2: {
        text: '¿Para qué se ejecuta la "Sprint Review" (Revisión del Sprint)?',
        options: ['Para encontrar a los responsables del mal código de los desarrolladores', 'Para inspeccionar el resultado del Sprint y presentar los avances ante autoridades y clientes', 'Para redactar actas formales exclusivas a mano', 'Para asignar salarios en función de líneas estáticas codificadas'],
        correctIndex: 1,
    },
    q3: {
        text: '¿Cuál es la función del "Sprint Retrospective" (Retrospectiva del Sprint)?',
        options: ['Lanzar código al mercado para nuevos compradores', 'Planificar en equipo y de forma autónoma formas audaces de incrementar su calidad técnica y cohesión social', 'Festejar compras corporativas si hay un avance comercial', 'Documentar licencias contables obligatorias por software'],
        correctIndex: 1,
    },
    q4: {
        text: '¿Qué extensión temporal dictamina la metodología oficial de forma inquebrantable para un Sprint?',
        options: ['El tiempo que se necesite es completamente libre y opcional', 'La duración estricta está fijada en un máximo de un mes calendario, ni más y nunca excediendo el calendario', 'Siempre un margen de dos horas de ejecución', 'Aproximadamente se requiere al menos el semestre escolar completo'],
        correctIndex: 1,
    },
    q5: {
        text: 'Si el objetivo del Sprint actual carece de sentido súbitamente (e.j. bancarrota, el mercado cambió), ¿Quién es el único autorizado para cancelar abortando dicho Sprint?',
        options: ['El Desarrollador Líder Principal', 'El Inversionista Comercial Externo', 'El Product Owner del mismo Equipo', 'El Especialista Jurídico de Reclutamiento'],
        correctIndex: 2,
    },
    q6: {
        text: 'Durante la etapa técnica formal de Sprint Planning, los desarrolladores seleccionan elementos ¿De dónde extraen estos elementos?',
        options: ['Del correo dictatorial masivo de las jefaturas', 'De su intuición e inventiva individual diaria', 'Del Product Backlog ordenado en antelación', 'De los repositorios antiguos sin depurar de hace diez años'],
        correctIndex: 2,
    },
}

export const LEVELS: ReadonlyArray<GameLevel> = [
    {
        id: 'nivel-1',
        name: 'Misión: PMBOK Introducción',
        description: 'Demuestra los conocimientos elementales del Project Management Institute y previene explosiones críticas por desconocimiento del marco teórico.',
        difficulty: 'Facil',
        estimatedMinutes: 5,
        isLocked: false,
        questions: pmbokIntro,
    },
    {
        id: 'nivel-2',
        name: 'Misión: Áreas de Conocimiento',
        description: 'Conoce con certeza las áreas troncales de los proyectos tradicionales, un error aquí y se desestabiliza el núcleo del sistema.',
        difficulty: 'Media',
        estimatedMinutes: 6,
        isLocked: false,
        questions: pmbokMiddle,
    },
    {
        id: 'nivel-3',
        name: 'Misión: Procesos y Ejecución',
        description: 'La bomba de tiempo necesita que conozcas al dedillo cómo ejecutar los subprocesos de PMBOK durante un ciclo de vida real.',
        difficulty: 'Dificil',
        estimatedMinutes: 6,
        isLocked: false,
        questions: pmbokEnd,
    },
    {
        id: 'nivel-4',
        name: 'Misión: Marcos Ágiles',
        description: 'Ingresa al segmento de la agilidad. Resuelve los interrogantes fundamentales de la metodología SCRUM y salva los circuitos principales.',
        difficulty: 'Facil',
        estimatedMinutes: 5,
        isLocked: false,
        questions: scrumIntro,
    },
    {
        id: 'nivel-5',
        name: 'Misión: Artefactos Ágiles',
        description: 'El reloj sigue corriendo, los Backlog esperan evaluación, elige sabiamente las definiciones teóricas antes de tu destrucción virtual.',
        difficulty: 'Media',
        estimatedMinutes: 6,
        isLocked: false,
        questions: scrumMiddle,
    },
    {
        id: 'nivel-6',
        name: 'Misión: Eventos SCRUM',
        description: 'Las cajas de tiempo, el Sprint y la disciplina ágil son lo único que te separa de la denotación total. ¿Conoces el pulso de la agilidad?',
        difficulty: 'Dificil',
        estimatedMinutes: 7,
        isLocked: false,
        questions: scrumEnd,
    },
] satisfies ReadonlyArray<GameLevel>