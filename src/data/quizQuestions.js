export const QUIZ_QUESTIONS = {
  seiri: {
    name: { en: 'Seiri (Sort)', fr: 'Seiri (Trier)', ar: 'سيري (الفرز)' },
    emoji: '📋',
    questions: [
      {
        id: 1,
        question: {
          en: 'What is the main purpose of Seiri (Sort)?',
          fr: 'Quel est le but principal de Seiri (Trier)?',
          ar: 'ما هو الهدف الرئيسي من سيري (الفرز)?'
        },
        options: {
          en: ['Eliminate unnecessary items', 'Clean the workplace', 'Organize tools', 'Create standards'],
          fr: ['Éliminer les éléments inutiles', 'Nettoyer le lieu de travail', 'Organiser les outils', 'Créer des standards'],
          ar: ['التخلص من العناصر غير الضرورية', 'تنظيف مكان العمل', 'تنظيم الأدوات', 'إنشاء معايير']
        },
        correct: 0
      },
      {
        id: 2,
        question: {
          en: 'What should you do with broken tools in Seiri?',
          fr: 'Que devez-vous faire avec les outils cassés dans Seiri?',
          ar: 'ماذا يجب أن تفعل مع الأدوات المكسورة في سيري?'
        },
        options: {
          en: ['Keep them for later', 'Repair them immediately', 'Remove them from workspace', 'Store them in a drawer'],
          fr: ['Les garder pour plus tard', 'Les réparer immédiatement', 'Les retirer de l\'espace de travail', 'Les ranger dans un tiroir'],
          ar: ['الاحتفاظ بها لوقت لاحق', 'إصلاحها فوراً', 'إزالتها من مكان العمل', 'تخزينها في درج']
        },
        correct: 2
      },
      {
        id: 3,
        question: {
          en: 'Which action is NOT part of Seiri?',
          fr: 'Quelle action ne fait PAS partie de Seiri?',
          ar: 'أي إجراء ليس جزءاً من سيري?'
        },
        options: {
          en: ['Sorting items', 'Removing clutter', 'Cleaning equipment', 'Archiving old documents'],
          fr: ['Trier les articles', 'Enlever l\'encombrement', 'Nettoyer l\'équipement', 'Archiver les anciens documents'],
          ar: ['فرز العناصر', 'إزالة الفوضى', 'تنظيف المعدات', 'أرشفة المستندات القديمة']
        },
        correct: 2
      },
      {
        id: 4,
        question: {
          en: 'What is the first step in implementing Seiri?',
          fr: 'Quelle est la première étape pour mettre en œuvre Seiri?',
          ar: 'ما هي الخطوة الأولى في تنفيذ سيري?'
        },
        options: {
          en: ['Identify all items in the area', 'Clean the area', 'Organize tools', 'Create labels'],
          fr: ['Identifier tous les articles dans la zone', 'Nettoyer la zone', 'Organiser les outils', 'Créer des étiquettes'],
          ar: ['تحديد جميع العناصر في المنطقة', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إنشاء ملصقات']
        },
        correct: 0
      },
      {
        id: 5,
        question: {
          en: 'What is the red tag technique in Seiri?',
          fr: 'Qu\'est-ce que la technique du tag rouge dans Seiri?',
          ar: 'ما هي تقنية البطاقة الحمراء في سيري?'
        },
        options: {
          en: ['Marking items to be removed', 'Labeling organization tools', 'Cleaning schedule', 'Safety signs'],
          fr: ['Marquer les éléments à retirer', 'Étiqueter les outils d\'organisation', 'Calendrier de nettoyage', 'Panneaux de sécurité'],
          ar: ['وضع علامات على العناصر المراد إزالتها', 'وضع ملصقات على أدوات التنظيم', 'جدول التنظيف', 'علامات السلامة']
        },
        correct: 0
      },
      {
        id: 6,
        question: {
          en: 'How often should Seiri be performed?',
          fr: 'À quelle fréquence Seiri doit-il être effectué?',
          ar: 'كم مرة يجب تنفيذ سيري?'
        },
        options: {
          en: ['Daily', 'Weekly', 'Monthly', 'When needed'],
          fr: ['Quotidiennement', 'Hebdomadairement', 'Mensuellement', 'Quand nécessaire'],
          ar: ['يومياً', 'أسبوعياً', 'شهرياً', 'عند الحاجة']
        },
        correct: 3
      },
      {
        id: 7,
        question: {
          en: 'What happens to items with red tags in Seiri?',
          fr: 'Qu\'advient-il des articles avec des tags rouges dans Seiri?',
          ar: 'ماذا يحدث للعناصر ذات البطاقات الحمراء في سيري?'
        },
        options: {
          en: ['They are organized', 'They are cleaned', 'They are evaluated for removal', 'They are stored'],
          fr: ['Ils sont organisés', 'Ils sont nettoyés', 'Ils sont évalués pour élimination', 'Ils sont stockés'],
          ar: ['يتم تنظيمها', 'يتم تنظيفها', 'يتم تقييمها للإزالة', 'يتم تخزينها']
        },
        correct: 2
      },
      {
        id: 8,
        question: {
          en: 'What is the 5S principle that focuses on eliminating waste?',
          fr: 'Quel est le principe 5S qui se concentre sur l\'élimination des déchets?',
          ar: 'ما هو مبدأ 5S الذي يركز على التخلص من النفايات?'
        },
        options: {
          en: ['Seiri', 'Seiton', 'Seiso', 'Shitsuke'],
          fr: ['Seiri', 'Seiton', 'Seiso', 'Shitsuke'],
          ar: ['سيري', 'سيتون', 'سيسو', 'شيتسوكي']
        },
        correct: 0
      },
      {
        id: 9,
        question: {
          en: 'Which of these is NOT a benefit of Seiri?',
          fr: 'Lequel de ces éléments n\'est PAS un avantage de Seiri?',
          ar: 'أي من هذه ليس فائدة من سيري?'
        },
        options: {
          en: ['Saves space', 'Reduces waste', 'Improves safety', 'Increases cleaning time'],
          fr: ['Gagne de l\'espace', 'Réduit les déchets', 'Améliore la sécurité', 'Augmente le temps de nettoyage'],
          ar: ['يوفر المساحة', 'يقلل النفايات', 'يحسن السلامة', 'يزيد وقت التنظيف']
        },
        correct: 3
      },
      {
        id: 10,
        question: {
          en: 'What should you do with items that are unused but may be needed in the future?',
          fr: 'Que faire des éléments inutilisés mais qui pourraient être nécessaires à l\'avenir?',
          ar: 'ماذا تفعل مع العناصر غير المستخدمة ولكن قد تكون هناك حاجة إليها في المستقبل?'
        },
        options: {
          en: ['Keep them in the workspace', 'Move to storage area', 'Discard immediately', 'Give away'],
          fr: ['Les garder dans l\'espace de travail', 'Les déplacer vers la zone de stockage', 'Les jeter immédiatement', 'Les donner'],
          ar: ['الاحتفاظ بها في مكان العمل', 'نقلها إلى منطقة التخزين', 'التخلص منها فوراً', 'التبرع بها']
        },
        correct: 1
      }
    ]
  },
  seiton: {
    name: { en: 'Seiton (Set in order)', fr: 'Seiton (Ranger)', ar: 'سيتون (الترتيب)' },
    emoji: '📦',
    questions: [
      {
        id: 11,
        question: {
          en: 'What is the main purpose of Seiton (Set in order)?',
          fr: 'Quel est le but principal de Seiton (Ranger)?',
          ar: 'ما هو الهدف الرئيسي من سيتون (الترتيب)?'
        },
        options: {
          en: ['Organize items properly', 'Clean the area', 'Remove waste', 'Create labels'],
          fr: ['Organiser correctement les articles', 'Nettoyer la zone', 'Retirer les déchets', 'Créer des étiquettes'],
          ar: ['تنظيم العناصر بشكل صحيح', 'تنظيف المنطقة', 'إزالة النفايات', 'إنشاء ملصقات']
        },
        correct: 0
      },
      {
        id: 12,
        question: {
          en: 'What is a shadow board used for in Seiton?',
          fr: 'À quoi sert un tableau d\'ombre dans Seiton?',
          ar: 'ما هو استخدام لوحة الظل في سيتون?'
        },
        options: {
          en: ['Tool organization', 'Cleaning schedule', 'Safety instructions', 'Quality control'],
          fr: ['Organisation des outils', 'Calendrier de nettoyage', 'Instructions de sécurité', 'Contrôle qualité'],
          ar: ['تنظيم الأدوات', 'جدول التنظيف', 'تعليمات السلامة', 'مراقبة الجودة']
        },
        correct: 0
      },
      {
        id: 13,
        question: {
          en: 'What is the "place for everything" principle in Seiton?',
          fr: 'Quel est le principe "une place pour chaque chose" dans Seiton?',
          ar: 'ما هو مبدأ "مكان لكل شيء" في سيتون?'
        },
        options: {
          en: ['Organize items logically', 'Clean regularly', 'Remove waste', 'Create standards'],
          fr: ['Organiser les articles logiquement', 'Nettoyer régulièrement', 'Retirer les déchets', 'Créer des standards'],
          ar: ['تنظيم العناصر بشكل منطقي', 'التنظيف بانتظام', 'إزالة النفايات', 'إنشاء معايير']
        },
        correct: 0
      },
      {
        id: 14,
        question: {
          en: 'Which tool is used for visual organization in Seiton?',
          fr: 'Quel outil est utilisé pour l\'organisation visuelle dans Seiton?',
          ar: 'ما هي الأداة المستخدمة للتنظيم البصري في سيتون?'
        },
        options: {
          en: ['Color coding', 'Cleaning products', 'Safety equipment', 'Documentation'],
          fr: ['Code couleur', 'Produits de nettoyage', 'Équipement de sécurité', 'Documentation'],
          ar: ['الترميز اللوني', 'منتجات التنظيف', 'معدات السلامة', 'التوثيق']
        },
        correct: 0
      },
      {
        id: 15,
        question: {
          en: 'What is the benefit of proper tool placement in Seiton?',
          fr: 'Quel est l\'avantage d\'un bon placement des outils dans Seiton?',
          ar: 'ما هي فائدة وضع الأدوات بشكل صحيح في سيتون?'
        },
        options: {
          en: ['Saves time searching', 'Makes cleaning easier', 'Reduces costs', 'Improves quality'],
          fr: ['Gagne du temps de recherche', 'Facilite le nettoyage', 'Réduit les coûts', 'Améliore la qualité'],
          ar: ['يوفر وقت البحث', 'يجعل التنظيف أسهل', 'يقلل التكاليف', 'يحسن الجودة']
        },
        correct: 0
      },
      {
        id: 16,
        question: {
          en: 'What does "everything in its place" mean in Seiton?',
          fr: 'Que signifie "chaque chose à sa place" dans Seiton?',
          ar: 'ماذا يعني "كل شيء في مكانه" في سيتون?'
        },
        options: {
          en: ['Items have designated locations', 'Items are clean', 'Items are removed', 'Items are labeled'],
          fr: ['Les articles ont des emplacements désignés', 'Les articles sont propres', 'Les articles sont retirés', 'Les articles sont étiquetés'],
          ar: ['العناصر لها مواقع محددة', 'العناصر نظيفة', 'العناصر مزالة', 'العناصر م labeled']
        },
        correct: 0
      },
      {
        id: 17,
        question: {
          en: 'How should frequently used items be placed in Seiton?',
          fr: 'Comment les articles fréquemment utilisés doivent-ils être placés dans Seiton?',
          ar: 'كيف يجب وضع العناصر المستخدمة بكثرة في سيتون?'
        },
        options: {
          en: ['Near the work area', 'In storage', 'Far away', 'In drawers'],
          fr: ['Près de la zone de travail', 'Dans le stockage', 'Loin', 'Dans des tiroirs'],
          ar: ['بالقرب من منطقة العمل', 'في المخزن', 'بعيداً', 'في الأدراج']
        },
        correct: 0
      },
      {
        id: 18,
        question: {
          en: 'What is the purpose of labels in Seiton?',
          fr: 'Quel est le but des étiquettes dans Seiton?',
          ar: 'ما هو الغرض من الملصقات في سيتون?'
        },
        options: {
          en: ['Identify items and locations', 'Decorate the area', 'Cleanliness', 'Safety'],
          fr: ['Identifier les articles et les emplacements', 'Décorer la zone', 'Propreté', 'Sécurité'],
          ar: ['تحديد العناصر والمواقع', 'تزيين المنطقة', 'النظافة', 'السلامة']
        },
        correct: 0
      },
      {
        id: 19,
        question: {
          en: 'Which of these is a tool used in Seiton?',
          fr: 'Lequel de ces outils est utilisé dans Seiton?',
          ar: 'أي من هذه الأدوات تستخدم في سيتون?'
        },
        options: {
          en: ['Shadow boards', 'Brooms', 'Red tags', 'Checklists'],
          fr: ['Tableaux d\'ombre', 'Balais', 'Tags rouges', 'Listes de contrôle'],
          ar: ['لوحات الظل', 'مكانس', 'بطاقات حمراء', 'قوائم مرجعية']
        },
        correct: 0
      },
      {
        id: 20,
        question: {
          en: 'How does Seiton contribute to safety?',
          fr: 'Comment Seiton contribue-t-il à la sécurité?',
          ar: 'كيف يساهم سيتون في السلامة?'
        },
        options: {
          en: ['Reduces clutter and tripping hazards', 'Cleans the area', 'Removes waste', 'Creates standards'],
          fr: ['Réduit l\'encombrement et les risques de chute', 'Nettoie la zone', 'Retire les déchets', 'Crée des standards'],
          ar: ['يقلل الفوضى ومخاطر التعثر', 'ينظف المنطقة', 'يزيل النفايات', 'ينشئ معايير']
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
        id: 21,
        question: {
          en: 'What is the main purpose of Seiso (Shine)?',
          fr: 'Quel est le but principal de Seiso (Nettoyer)?',
          ar: 'ما هو الهدف الرئيسي من سيسو (التنظيف)?'
        },
        options: {
          en: ['Clean and inspect work area', 'Organize tools', 'Remove waste', 'Create standards'],
          fr: ['Nettoyer et inspecter la zone de travail', 'Organiser les outils', 'Retirer les déchets', 'Créer des standards'],
          ar: ['تنظيف وفحص منطقة العمل', 'تنظيم الأدوات', 'إزالة النفايات', 'إنشاء معايير']
        },
        correct: 0
      },
      {
        id: 22,
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
        id: 23,
        question: {
          en: 'What is the relationship between cleaning and inspection in Seiso?',
          fr: 'Quelle est la relation entre le nettoyage et l\'inspection dans Seiso?',
          ar: 'ما هي العلاقة بين التنظيف والفحص في سيسو?'
        },
        options: {
          en: ['Cleaning reveals problems', 'They are separate tasks', 'Only cleaning matters', 'Inspection is optional'],
          fr: ['Le nettoyage révèle les problèmes', 'Ce sont des tâches séparées', 'Seul le nettoyage compte', 'L\'inspection est facultative'],
          ar: ['التنظيف يكشف المشاكل', 'هما مهمتان منفصلتان', 'التنظيف فقط مهم', 'الفحص اختياري']
        },
        correct: 0
      },
      {
        id: 24,
        question: {
          en: 'What should you inspect during Seiso?',
          fr: 'Que devez-vous inspecter pendant Seiso?',
          ar: 'ماذا يجب أن تفحص أثناء سيسو?'
        },
        options: {
          en: ['Equipment for leaks and damage', 'Only the floor', 'Storage areas', 'Just the tools'],
          fr: ['Les équipements pour les fuites et les dommages', 'Seulement le sol', 'Les zones de stockage', 'Seulement les outils'],
          ar: ['المعدات بحثاً عن تسريبات وتلف', 'فقط الأرضية', 'مناطق التخزين', 'فقط الأدوات']
        },
        correct: 0
      },
      {
        id: 25,
        question: {
          en: 'What is the benefit of regular cleaning in Seiso?',
          fr: 'Quel est l\'avantage du nettoyage régulier dans Seiso?',
          ar: 'ما هي فائدة التنظيف المنتظم في سيسو?'
        },
        options: {
          en: ['Extends equipment life', 'Takes time', 'Costs money', 'Requires effort'],
          fr: ['Prolonge la durée de vie des équipements', 'Prend du temps', 'Coûte de l\'argent', 'Nécessite des efforts'],
          ar: ['يطيل عمر المعدات', 'يأخذ وقتاً', 'يكلف مالاً', 'يتطلب جهداً']
        },
        correct: 0
      },
      {
        id: 26,
        question: {
          en: 'What should you do if you find a problem during Seiso?',
          fr: 'Que devez-vous faire si vous trouvez un problème pendant Seiso?',
          ar: 'ماذا يجب أن تفعل إذا وجدت مشكلة أثناء سيسو?'
        },
        options: {
          en: ['Report it immediately', 'Ignore it', 'Fix it later', 'Clean around it'],
          fr: ['Le signaler immédiatement', 'L\'ignorer', 'Le réparer plus tard', 'Nettoyer autour'],
          ar: ['الإبلاغ عنها فوراً', 'تجاهلها', 'إصلاحها لاحقاً', 'التنظيف حولها']
        },
        correct: 0
      },
      {
        id: 27,
        question: {
          en: 'What makes a workplace "shine" in Seiso?',
          fr: 'Qu\'est-ce qui fait qu\'un lieu de travail "brille" dans Seiso?',
          ar: 'ما الذي يجعل مكان العمل "يلمع" في سيسو?'
        },
        options: {
          en: ['Cleanliness and order', 'New equipment', 'Bright lights', 'Decorations'],
          fr: ['Propreté et ordre', 'Nouvel équipement', 'Lumières vives', 'Décorations'],
          ar: ['النظافة والنظام', 'معدات جديدة', 'أضواء ساطعة', 'زينة']
        },
        correct: 0
      },
      {
        id: 28,
        question: {
          en: 'Which of these is NOT a step in Seiso?',
          fr: 'Lequel de ces éléments n\'est PAS une étape de Seiso?',
          ar: 'أي من هذه ليس خطوة في سيسو?'
        },
        options: {
          en: ['Sweeping floors', 'Cleaning equipment', 'Labeling items', 'Wiping surfaces'],
          fr: ['Balayer les sols', 'Nettoyer l\'équipement', 'Étiqueter les articles', 'Essuyer les surfaces'],
          ar: ['كنس الأرضيات', 'تنظيف المعدات', 'وضع ملصقات على العناصر', 'مسح الأسطح']
        },
        correct: 2
      },
      {
        id: 29,
        question: {
          en: 'How does Seiso help identify problems early?',
          fr: 'Comment Seiso aide-t-il à identifier les problèmes tôt?',
          ar: 'كيف يساعد سيسو في تحديد المشاكل مبكراً?'
        },
        options: {
          en: ['Cleaning makes issues visible', 'By organizing tools', 'Through documentation', 'By training'],
          fr: ['Le nettoyage rend les problèmes visibles', 'En organisant les outils', 'Par la documentation', 'Par la formation'],
          ar: ['التنظيف يجعل المشاكل مرئية', 'عن طريق تنظيم الأدوات', 'من خلال التوثيق', 'عن طريق التدريب']
        },
        correct: 0
      },
      {
        id: 30,
        question: {
          en: 'What is the result of a clean workplace in Seiso?',
          fr: 'Quel est le résultat d\'un lieu de travail propre dans Seiso?',
          ar: 'ما هي نتيجة مكان العمل النظيف في سيسو?'
        },
        options: {
          en: ['Improved safety and morale', 'More work', 'Higher costs', 'Less efficiency'],
          fr: ['Sécurité et moral améliorés', 'Plus de travail', 'Coûts plus élevés', 'Moins d\'efficacité'],
          ar: ['تحسين السلامة والروح المعنوية', 'المزيد من العمل', 'تكاليف أعلى', 'كفاءة أقل']
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
        id: 31,
        question: {
          en: 'What is the main purpose of Seiketsu (Standardize)?',
          fr: 'Quel est le but principal de Seiketsu (Standardiser)?',
          ar: 'ما هو الهدف الرئيسي من سيكيتسو (التوحيد)?'
        },
        options: {
          en: ['Create standards and procedures', 'Clean the area', 'Organize tools', 'Remove waste'],
          fr: ['Créer des standards et procédures', 'Nettoyer la zone', 'Organiser les outils', 'Retirer les déchets'],
          ar: ['إنشاء معايير وإجراءات', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إزالة النفايات']
        },
        correct: 0
      },
      {
        id: 32,
        question: {
          en: 'What is a standard operating procedure (SOP)?',
          fr: 'Qu\'est-ce qu\'une procédure opérationnelle standard (SOP)?',
          ar: 'ما هي إجراءات التشغيل القياسية (SOP)?'
        },
        options: {
          en: ['Written instructions for tasks', 'Cleaning schedule', 'Tool list', 'Safety rules'],
          fr: ['Instructions écrites pour les tâches', 'Calendrier de nettoyage', 'Liste d\'outils', 'Règles de sécurité'],
          ar: ['تعليمات مكتوبة للمهام', 'جدول التنظيف', 'قائمة الأدوات', 'قواعد السلامة']
        },
        correct: 0
      },
      {
        id: 33,
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
      },
      {
        id: 34,
        question: {
          en: 'What is a visual standard in Seiketsu?',
          fr: 'Qu\'est-ce qu\'un standard visuel dans Seiketsu?',
          ar: 'ما هو المعيار البصري في سيكيتسو?'
        },
        options: {
          en: ['Visual guides and signage', 'Cleaning schedule', 'Tool inventory', 'Safety manual'],
          fr: ['Guides visuels et signalisation', 'Calendrier de nettoyage', 'Inventaire des outils', 'Manuel de sécurité'],
          ar: ['أدلة بصرية ولافتات', 'جدول التنظيف', 'جرد الأدوات', 'دليل السلامة']
        },
        correct: 0
      },
      {
        id: 35,
        question: {
          en: 'How do you maintain standards in Seiketsu?',
          fr: 'Comment maintenez-vous les standards dans Seiketsu?',
          ar: 'كيف تحافظ على المعايير في سيكيتسو?'
        },
        options: {
          en: ['Through regular audits and updates', 'By cleaning', 'By organizing', 'By removing waste'],
          fr: ['Par des audits et mises à jour réguliers', 'En nettoyant', 'En organisant', 'En retirant les déchets'],
          ar: ['من خلال التدقيق والتحديث المنتظم', 'عن طريق التنظيف', 'عن طريق التنظيم', 'عن طريق إزالة النفايات']
        },
        correct: 0
      },
      {
        id: 36,
        question: {
          en: 'Which of these is used in Seiketsu?',
          fr: 'Lequel de ces éléments est utilisé dans Seiketsu?',
          ar: 'أي من هذه يستخدم في سيكيتسو?'
        },
        options: {
          en: ['Checklists', 'Brooms', 'Red tags', 'Storage bins'],
          fr: ['Listes de contrôle', 'Balais', 'Tags rouges', 'Bacs de stockage'],
          ar: ['قوائم مرجعية', 'مكانس', 'بطاقات حمراء', 'صناديق تخزين']
        },
        correct: 0
      },
      {
        id: 37,
        question: {
          en: 'What does Seiketsu help create?',
          fr: 'Qu\'est-ce que Seiketsu aide à créer?',
          ar: 'ما الذي يساعد سيكيتسو في إنشائه?'
        },
        options: {
          en: ['Consistent work methods', 'More cleaning', 'More tools', 'More space'],
          fr: ['Des méthodes de travail cohérentes', 'Plus de nettoyage', 'Plus d\'outils', 'Plus d\'espace'],
          ar: ['أساليب عمل متسقة', 'المزيد من التنظيف', 'المزيد من الأدوات', 'المزيد من المساحة']
        },
        correct: 0
      },
      {
        id: 38,
        question: {
          en: 'How do you document best practices in Seiketsu?',
          fr: 'Comment documentez-vous les meilleures pratiques dans Seiketsu?',
          ar: 'كيف توثق أفضل الممارسات في سيكيتسو?'
        },
        options: {
          en: ['Write standard procedures', 'Take photos', 'Create videos', 'All of the above'],
          fr: ['Rédiger des procédures standard', 'Prendre des photos', 'Créer des vidéos', 'Toutes les réponses'],
          ar: ['كتابة الإجراءات القياسية', 'التقاط الصور', 'إنشاء فيديوهات', 'كل ما سبق']
        },
        correct: 3
      },
      {
        id: 39,
        question: {
          en: 'What is the relationship between Seiketsu and other 5S principles?',
          fr: 'Quelle est la relation entre Seiketsu et les autres principes 5S?',
          ar: 'ما هي العلاقة بين سيكيتسو ومبادئ 5S الأخرى?'
        },
        options: {
          en: ['Standardizes the first 3 principles', 'Replaces them', 'Is unrelated', 'Complicates them'],
          fr: ['Standardise les 3 premiers principes', 'Les remplace', 'Est sans rapport', 'Les complique'],
          ar: ['يوحد المبادئ الثلاثة الأولى', 'يستبدلها', 'غير مرتبط', 'يعقدها']
        },
        correct: 0
      },
      {
        id: 40,
        question: {
          en: 'What is the goal of Seiketsu?',
          fr: 'Quel est l\'objectif de Seiketsu?',
          ar: 'ما هو هدف سيكيتسو?'
        },
        options: {
          en: ['Make 5S routine and consistent', 'Clean more', 'Organize better', 'Reduce waste'],
          fr: ['Rendre la 5S routinière et cohérente', 'Nettoyer plus', 'Mieux organiser', 'Réduire les déchets'],
          ar: ['جعل 5S روتينية ومتسقة', 'تنظيف أكثر', 'تنظيم أفضل', 'تقليل النفايات']
        },
        correct: 0
      }
    ]
  },
  shitsuke: {
    name: { en: 'Shitsuke (Sustain)', fr: 'Shitsuke (Maintenir)', ar: 'شيتسوكي (الاستدامة)' },
    emoji: '🔄',
    questions: [
      {
        id: 41,
        question: {
          en: 'What is the main purpose of Shitsuke (Sustain)?',
          fr: 'Quel est le but principal de Shitsuke (Maintenir)?',
          ar: 'ما هو الهدف الرئيسي من شيتسوكي (الاستدامة)?'
        },
        options: {
          en: ['Maintain discipline and continuous improvement', 'Clean the area', 'Organize tools', 'Create standards'],
          fr: ['Maintenir la discipline et l\'amélioration continue', 'Nettoyer la zone', 'Organiser les outils', 'Créer des standards'],
          ar: ['الحفاظ على الانضباط والتحسين المستمر', 'تنظيف المنطقة', 'تنظيم الأدوات', 'إنشاء معايير']
        },
        correct: 0
      },
      {
        id: 42,
        question: {
          en: 'How do you sustain 5S practices?',
          fr: 'Comment maintenez-vous les pratiques 5S?',
          ar: 'كيف تحافظ على ممارسات 5S?'
        },
        options: {
          en: ['Through regular audits and training', 'By cleaning', 'By organizing', 'By removing waste'],
          fr: ['Par des audits et formations réguliers', 'En nettoyant', 'En organisant', 'En retirant les déchets'],
          ar: ['من خلال التدقيق والتدريب المنتظم', 'عن طريق التنظيف', 'عن طريق التنظيم', 'عن طريق إزالة النفايات']
        },
        correct: 0
      },
      {
        id: 43,
        question: {
          en: 'What is the role of management in Shitsuke?',
          fr: 'Quel est le rôle de la direction dans Shitsuke?',
          ar: 'ما هو دور الإدارة في شيتسوكي?'
        },
        options: {
          en: ['Provide support and resources', 'Only observe', 'Do the work', 'Ignore the process'],
          fr: ['Fournir du soutien et des ressources', 'Seulement observer', 'Faire le travail', 'Ignorer le processus'],
          ar: ['تقديم الدعم والموارد', 'المراقبة فقط', 'القيام بالعمل', 'تجاهل العملية']
        },
        correct: 0
      },
      {
        id: 44,
        question: {
          en: 'How often should 5S audits be conducted?',
          fr: 'À quelle fréquence les audits 5S doivent-ils être effectués?',
          ar: 'كم مرة يجب إجراء عمليات تدقيق 5S?'
        },
        options: {
          en: ['Regularly (weekly/monthly)', 'Once a year', 'Never', 'Only when there is a problem'],
          fr: ['Régulièrement (hebdomadaire/mensuel)', 'Une fois par an', 'Jamais', 'Seulement quand il y a un problème'],
          ar: ['بانتظام (أسبوعي/شهري)', 'مرة في السنة', 'أبداً', 'فقط عند وجود مشكلة']
        },
        correct: 0
      },
      {
        id: 45,
        question: {
          en: 'What is continuous improvement in Shitsuke?',
          fr: 'Qu\'est-ce que l\'amélioration continue dans Shitsuke?',
          ar: 'ما هو التحسين المستمر في شيتسوكي?'
        },
        options: {
          en: ['Always looking for ways to improve', 'Doing the same thing', 'Cleaning more', 'Organizing more'],
          fr: ['Toujours chercher des moyens de s\'améliorer', 'Faire la même chose', 'Nettoyer plus', 'Organiser plus'],
          ar: ['البحث دائماً عن طرق للتحسين', 'فعل نفس الشيء', 'تنظيف أكثر', 'تنظيم أكثر']
        },
        correct: 0
      },
      {
        id: 46,
        question: {
          en: 'How do you create a culture of Shitsuke?',
          fr: 'Comment créez-vous une culture de Shitsuke?',
          ar: 'كيف تخلق ثقافة شيتسوكي?'
        },
        options: {
          en: ['Through training and leadership example', 'By forcing employees', 'By ignoring problems', 'By doing nothing'],
          fr: ['Par la formation et l\'exemple du leadership', 'En forçant les employés', 'En ignorant les problèmes', 'En ne faisant rien'],
          ar: ['من خلال التدريب وقدوة القيادة', 'عن طريق إجبار الموظفين', 'عن طريق تجاهل المشاكل', 'عن طريق عدم فعل شيء']
        },
        correct: 0
      },
      {
        id: 47,
        question: {
          en: 'What is the benefit of Shitsuke?',
          fr: 'Quel est l\'avantage de Shitsuke?',
          ar: 'ما هي فائدة شيتسوكي?'
        },
        options: {
          en: ['Prevents regression and ensures progress', 'More cleaning', 'Better tools', 'More space'],
          fr: ['Prévient la régression et assure le progrès', 'Plus de nettoyage', 'Meilleurs outils', 'Plus d\'espace'],
          ar: ['يمنع التراجع ويضمن التقدم', 'المزيد من التنظيف', 'أدوات أفضل', 'المزيد من المساحة']
        },
        correct: 0
      },
      {
        id: 48,
        question: {
          en: 'How do you celebrate successes in Shitsuke?',
          fr: 'Comment célébrez-vous les succès dans Shitsuke?',
          ar: 'كيف تحتفل بالنجاحات في شيتسوكي?'
        },
        options: {
          en: ['Recognize and reward achievements', 'Do nothing', 'Ignore them', 'Wait for more'],
          fr: ['Reconnaître et récompenser les réalisations', 'Ne rien faire', 'Les ignorer', 'Attendre plus'],
          ar: ['تقدير ومكافأة الإنجازات', 'عدم فعل شيء', 'تجاهلها', 'انتظار المزيد']
        },
        correct: 0
      },
      {
        id: 49,
        question: {
          en: 'What is the final step in the 5S methodology?',
          fr: 'Quelle est la dernière étape de la méthodologie 5S?',
          ar: 'ما هي الخطوة الأخيرة في منهجية 5S?'
        },
        options: {
          en: ['Shitsuke (Sustain)', 'Seiri (Sort)', 'Seiton (Set in order)', 'Seiso (Shine)'],
          fr: ['Shitsuke (Maintenir)', 'Seiri (Trier)', 'Seiton (Ranger)', 'Seiso (Nettoyer)'],
          ar: ['شيتسوكي (الاستدامة)', 'سيري (الفرز)', 'سيتون (الترتيب)', 'سيسو (التنظيف)']
        },
        correct: 0
      },
      {
        id: 50,
        question: {
          en: 'What makes Shitsuke different from other 5S principles?',
          fr: 'Qu\'est-ce qui rend Shitsuke différent des autres principes 5S?',
          ar: 'ما الذي يجعل شيتسوكي مختلفاً عن مبادئ 5S الأخرى?'
        },
        options: {
          en: ['It sustains all the other principles', 'It is the first step', 'It is the easiest', 'It is the least important'],
          fr: ['Il soutient tous les autres principes', 'C\'est la première étape', 'C\'est le plus facile', 'C\'est le moins important'],
          ar: ['يحافظ على جميع المبادئ الأخرى', 'إنها الخطوة الأولى', 'إنها الأسهل', 'إنها الأقل أهمية']
        },
        correct: 0
      }
    ]
  }
};
