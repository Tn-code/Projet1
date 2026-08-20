export const ASSESSMENT_QUESTIONS = {
  seiri: {
    name: { en: 'Seiri (Sort)', fr: 'Seiri (Trier)', ar: 'سيري (الفرز)' },
    emoji: '📋',
    questions: [
      {
        id: 's1',
        question: {
          en: 'What is the first step in implementing Seiri?',
          fr: 'Quelle est la première étape pour mettre en œuvre Seiri?',
          ar: 'ما هي الخطوة الأولى في تنفيذ سيري?'
        },
        options: {
          en: ['Identify all items in the workspace', 'Clean the area', 'Organize tools', 'Create labels'],
          fr: ['Identifier tous les articles dans l\'espace de travail', 'Nettoyer la zone', 'Organiser les outils', 'Créer des étiquettes'],
          ar: ['تحديد جميع العناصر في مكان العمل', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إنشاء ملصقات']
        },
        correct: 0
      },
      {
        id: 's2',
        question: {
          en: 'What should you do with items that are not needed in Seiri?',
          fr: 'Que devez-vous faire avec les articles non nécessaires dans Seiri?',
          ar: 'ماذا يجب أن تفعل مع العناصر غير الضرورية في سيري?'
        },
        options: {
          en: ['Keep them in storage', 'Remove them from workspace', 'Organize them better', 'Label them'],
          fr: ['Les garder dans le stockage', 'Les retirer de l\'espace de travail', 'Mieux les organiser', 'Les étiqueter'],
          ar: ['الاحتفاظ بها في المخزن', 'إزالتها من مكان العمل', 'تنظيمها بشكل أفضل', 'وضع ملصقات عليها']
        },
        correct: 1
      },
      {
        id: 's3',
        question: {
          en: 'What is the red tag technique used for in Seiri?',
          fr: 'À quoi sert la technique du tag rouge dans Seiri?',
          ar: 'ما هي استخدامات تقنية البطاقة الحمراء في سيري?'
        },
        options: {
          en: ['Marking items to be evaluated', 'Cleaning schedule', 'Safety signs', 'Tool organization'],
          fr: ['Marquer les articles à évaluer', 'Calendrier de nettoyage', 'Panneaux de sécurité', 'Organisation des outils'],
          ar: ['تحديد العناصر المراد تقييمها', 'جدول التنظيف', 'علامات السلامة', 'تنظيم الأدوات']
        },
        correct: 0
      }
    ]
  },
  seiton: {
    name: { en: 'Seiton (Set in order)', fr: 'Seiton (Ranger)', ar: 'سيتون (الترتيب)' },
    emoji: '📦',
    questions: [
      {
        id: 't1',
        question: {
          en: 'What is the main goal of Seiton?',
          fr: 'Quel est le principal objectif de Seiton?',
          ar: 'ما هو الهدف الرئيسي من سيتون?'
        },
        options: {
          en: ['Organize items for easy access', 'Clean the workplace', 'Remove waste', 'Create standards'],
          fr: ['Organiser les articles pour un accès facile', 'Nettoyer le lieu de travail', 'Retirer les déchets', 'Créer des standards'],
          ar: ['تنظيم العناصر لسهولة الوصول', 'تنظيف مكان العمل', 'إزالة النفايات', 'إنشاء معايير']
        },
        correct: 0
      },
      {
        id: 't2',
        question: {
          en: 'What tool is used in Seiton for visual organization?',
          fr: 'Quel outil est utilisé dans Seiton pour l\'organisation visuelle?',
          ar: 'ما هي الأداة المستخدمة في سيتون للتنظيم البصري?'
        },
        options: {
          en: ['Shadow boards', 'Cleaning supplies', 'Red tags', 'Safety equipment'],
          fr: ['Tableaux d\'ombre', 'Fournitures de nettoyage', 'Tags rouges', 'Équipement de sécurité'],
          ar: ['لوحات الظل', 'مستلزمات التنظيف', 'بطاقات حمراء', 'معدات السلامة']
        },
        correct: 0
      },
      {
        id: 't3',
        question: {
          en: 'What is the "place for everything" principle in Seiton?',
          fr: 'Quel est le principe "une place pour chaque chose" dans Seiton?',
          ar: 'ما هو مبدأ "مكان لكل شيء" في سيتون?'
        },
        options: {
          en: ['Everything has a designated location', 'Everything is cleaned daily', 'Everything is labeled', 'Everything is removed'],
          fr: ['Chaque chose a un emplacement désigné', 'Chaque chose est nettoyée quotidiennement', 'Chaque chose est étiquetée', 'Chaque chose est retirée'],
          ar: ['كل شيء له موقع محدد', 'كل شيء يتم تنظيفه يومياً', 'كل شيء م labeled', 'كل شيء يتم إزالته']
        },
        correct: 0
      }
    ]
  },
  seiso: {
    name: { en: 'Seiso (Shine)', fr: 'Seiso (Nettoyer)', ar: 'سيسو (التنظيف)' },
    emoji: '🧹',
    questions: [
      {
        id: 'c1',
        question: {
          en: 'What is the dual purpose of Seiso?',
          fr: 'Quel est le double objectif de Seiso?',
          ar: 'ما هو الهدف المزدوج من سيسو?'
        },
        options: {
          en: ['Clean and inspect', 'Organize and label', 'Sort and remove', 'Standardize and sustain'],
          fr: ['Nettoyer et inspecter', 'Organiser et étiqueter', 'Trier et retirer', 'Standardiser et maintenir'],
          ar: ['تنظيف وفحص', 'تنظيم ووضع ملصقات', 'فرز وإزالة', 'توحيد واستدامة']
        },
        correct: 0
      },
      {
        id: 'c2',
        question: {
          en: 'How often should Seiso be performed?',
          fr: 'À quelle fréquence Seiso doit-il être effectué?',
          ar: 'كم مرة يجب تنفيذ سيسو?'
        },
        options: {
          en: ['Daily', 'Weekly', 'Monthly', 'Annually'],
          fr: ['Quotidiennement', 'Hebdomadairement', 'Mensuellement', 'Annuellement'],
          ar: ['يومياً', 'أسبوعياً', 'شهرياً', 'سنوياً']
        },
        correct: 0
      },
      {
        id: 'c3',
        question: {
          en: 'What can cleaning reveal during Seiso?',
          fr: 'Que peut révéler le nettoyage pendant Seiso?',
          ar: 'ما الذي يمكن أن يكشفه التنظيف خلال سيسو?'
        },
        options: {
          en: ['Problems and defects', 'Organized tools', 'Clean surfaces', 'Labeled items'],
          fr: ['Problèmes et défauts', 'Outils organisés', 'Surfaces propres', 'Articles étiquetés'],
          ar: ['المشاكل والعيوب', 'الأدوات المنظمة', 'الأسطح النظيفة', 'العناصر الم labeled']
        },
        correct: 0
      }
    ]
  },
  seiketsu: {
    name: { en: 'Seiketsu (Standardize)', fr: 'Seiketsu (Standardiser)', ar: 'سيكيتسو (التوحيد)' },
    emoji: '📐',
    questions: [
      {
        id: 'd1',
        question: {
          en: 'What is the purpose of Seiketsu?',
          fr: 'Quel est le but de Seiketsu?',
          ar: 'ما هو الغرض من سيكيتسو?'
        },
        options: {
          en: ['Create standards and procedures', 'Clean the area', 'Organize tools', 'Remove waste'],
          fr: ['Créer des standards et procédures', 'Nettoyer la zone', 'Organiser les outils', 'Retirer les déchets'],
          ar: ['إنشاء معايير وإجراءات', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إزالة النفايات']
        },
        correct: 0
      },
      {
        id: 'd2',
        question: {
          en: 'What is a Standard Operating Procedure (SOP)?',
          fr: 'Qu\'est-ce qu\'une Procédure Opérationnelle Standard (SOP)?',
          ar: 'ما هي إجراءات التشغيل القياسية (SOP)?'
        },
        options: {
          en: ['Written instructions for tasks', 'Cleaning schedule', 'Tool inventory', 'Safety rules'],
          fr: ['Instructions écrites pour les tâches', 'Calendrier de nettoyage', 'Inventaire des outils', 'Règles de sécurité'],
          ar: ['تعليمات مكتوبة للمهام', 'جدول التنظيف', 'جرد الأدوات', 'قواعد السلامة']
        },
        correct: 0
      },
      {
        id: 'd3',
        question: {
          en: 'Why is standardization important in 5S?',
          fr: 'Pourquoi la standardisation est-elle importante dans la 5S?',
          ar: 'لماذا التوحيد مهم في 5S?'
        },
        options: {
          en: ['Ensures consistency', 'Saves time', 'Reduces cost', 'All of the above'],
          fr: ['Assure la cohérence', 'Gagne du temps', 'Réduit les coûts', 'Toutes les réponses'],
          ar: ['يضمن الاتساق', 'يوفر الوقت', 'يقلل التكلفة', 'كل ما سبق']
        },
        correct: 3
      }
    ]
  },
  shitsuke: {
    name: { en: 'Shitsuke (Sustain)', fr: 'Shitsuke (Maintenir)', ar: 'شيتسوكي (الاستدامة)' },
    emoji: '🔄',
    questions: [
      {
        id: 'u1',
        question: {
          en: 'What is the main focus of Shitsuke?',
          fr: 'Quel est le principal objectif de Shitsuke?',
          ar: 'ما هو التركيز الرئيسي لشيتسوكي?'
        },
        options: {
          en: ['Maintain discipline and improvement', 'Clean the area', 'Organize tools', 'Create standards'],
          fr: ['Maintenir la discipline et l\'amélioration', 'Nettoyer la zone', 'Organiser les outils', 'Créer des standards'],
          ar: ['الحفاظ على الانضباط والتحسين', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إنشاء معايير']
        },
        correct: 0
      },
      {
        id: 'u2',
        question: {
          en: 'How do you sustain 5S practices?',
          fr: 'Comment maintenez-vous les pratiques 5S?',
          ar: 'كيف تحافظ على ممارسات 5S?'
        },
        options: {
          en: ['Regular audits and training', 'One-time cleaning', 'Organizing once', 'Removing items'],
          fr: ['Audits et formations réguliers', 'Nettoyage ponctuel', 'Organiser une fois', 'Retirer les articles'],
          ar: ['التدقيق والتدريب المنتظم', 'تنظيف لمرة واحدة', 'تنظيم مرة واحدة', 'إزالة العناصر']
        },
        correct: 0
      },
      {
        id: 'u3',
        question: {
          en: 'What makes Shitsuke different from other 5S principles?',
          fr: 'Qu\'est-ce qui rend Shitsuke différent des autres principes 5S?',
          ar: 'ما الذي يجعل شيتسوكي مختلفاً عن مبادئ 5S الأخرى?'
        },
        options: {
          en: ['It sustains all other principles', 'It is the first step', 'It is the easiest', 'It is optional'],
          fr: ['Il soutient tous les autres principes', 'C\'est la première étape', 'C\'est le plus facile', 'C\'est facultatif'],
          ar: ['يحافظ على جميع المبادئ الأخرى', 'إنها الخطوة الأولى', 'إنها الأسهل', 'إنها اختيارية']
        },
        correct: 0
      }
    ]
  }
};
