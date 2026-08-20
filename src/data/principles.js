export const PRINCIPLES = [
  { 
    id: 'seiri', 
    name: { en: 'Seiri (Sort)', fr: 'Seiri (Trier)', ar: 'سيري (الفرز)' },
    emoji: '📋',
    color: '#FF6B6B',
    description: {
      en: 'Eliminate unnecessary items',
      fr: 'Éliminer ce qui est inutile',
      ar: 'التخلص من العناصر غير الضرورية'
    },
    details: {
      en: 'Sort through all items in the workspace and separate what is needed from what is not. Remove clutter, unused materials, and broken tools. This is the first and most important step in creating an organized workspace. Use red tags to mark items that need evaluation.',
      fr: 'Triez tous les articles dans l\'espace de travail et séparez ce qui est nécessaire de ce qui ne l\'est pas. Enlevez l\'encombrement, les matériaux inutilisés et les outils cassés. C\'est la première et la plus importante étape pour créer un espace de travail organisé. Utilisez des tags rouges pour marquer les articles à évaluer.',
      ar: 'فرز جميع العناصر في مكان العمل وفصل ما هو ضروري عن ما هو غير ضروري. إزالة الفوضى والمواد غير المستخدمة والأدوات المكسورة. هذه هي الخطوة الأولى والأكثر أهمية في إنشاء مكان عمل منظم. استخدم بطاقات حمراء لتحديد العناصر التي تحتاج إلى تقييم.'
    },
    examples: {
      en: ['Remove broken tools from workbench', 'Archive old documents', 'Discard expired materials', 'Use red tags for questionable items'],
      fr: ['Retirer les outils cassés de l\'établi', 'Archiver les anciens documents', 'Jeter les matériaux périmés', 'Utiliser des tags rouges pour les articles douteux'],
      ar: ['إزالة الأدوات المكسورة من طاولة العمل', 'أرشفة المستندات القديمة', 'التخلص من المواد منتهية الصلاحية', 'استخدام بطاقات حمراء للعناصر المشكوك فيها']
    },
    benefits: {
      en: ['Saves valuable workspace', 'Reduces waste and clutter', 'Improves safety', 'Increases efficiency', 'Better workflow'],
      fr: ['Gagne un espace de travail précieux', 'Réduit les déchets et l\'encombrement', 'Améliore la sécurité', 'Augmente l\'efficacité', 'Meilleur flux de travail'],
      ar: ['يوفر مساحة عمل قيمة', 'يقلل النفايات والفوضى', 'يحسن السلامة', 'يزيد الكفاءة', 'تحسين سير العمل']
    },
    keyPrinciple: {
      en: 'When in doubt, move it out!',
      fr: 'En cas de doute, sortez-le!',
      ar: 'عند الشك، أخرجه!'
    }
  },
  { 
    id: 'seiton', 
    name: { en: 'Seiton (Set in order)', fr: 'Seiton (Ranger)', ar: 'سيتون (الترتيب)' },
    emoji: '📦',
    color: '#4ECDC4',
    description: {
      en: 'Organize and arrange items properly',
      fr: 'Organiser et ranger correctement',
      ar: 'تنظيم وترتيب العناصر بشكل صحيح'
    },
    details: {
      en: 'Place items in designated locations for easy access and efficient workflow. Everything should have its place, and everything should be in its place. Use labels, color coding, and shadow boards to create a visual workplace where anyone can find what they need quickly.',
      fr: 'Placez les articles dans des emplacements désignés pour un accès facile et un flux de travail efficace. Chaque chose doit avoir sa place, et chaque chose doit être à sa place. Utilisez des étiquettes, des codes couleur et des tableaux d\'ombre pour créer un lieu de travail visuel où tout le monde peut trouver ce dont il a besoin rapidement.',
      ar: 'وضع العناصر في مواقع محددة لسهولة الوصول وسير العمل الفعال. كل شيء يجب أن يكون له مكان، وكل شيء يجب أن يكون في مكانه. استخدام الملصقات والترميز اللوني ولوحات الظل لإنشاء مكان عمل بصري حيث يمكن لأي شخص العثور على ما يحتاجه بسرعة.'
    },
    examples: {
      en: ['Label storage bins clearly', 'Create shadow boards for tools', 'Arrange frequently used items near work area', 'Use color coding for organization', 'Implement 5S floor markings'],
      fr: ['Étiqueter clairement les bacs de stockage', 'Créer des tableaux d\'ombre pour les outils', 'Placer les articles fréquemment utilisés près de la zone de travail', 'Utiliser un code couleur pour l\'organisation', 'Mettre en place des marquages au sol 5S'],
      ar: ['وضع ملصقات واضحة على صناديق التخزين', 'إنشاء لوحات ظل للأدوات', 'ترتيب العناصر المستخدمة بكثرة بالقرب من منطقة العمل', 'استخدام الترميز اللوني للتنظيم', 'تنفيذ علامات أرضية 5S']
    },
    benefits: {
      en: ['Saves time searching for items', 'Reduces unnecessary movement', 'Improves workflow', 'Increases productivity', 'Creates professional environment'],
      fr: ['Gagne du temps de recherche', 'Réduit les mouvements inutiles', 'Améliore le flux de travail', 'Augmente la productivité', 'Crée un environnement professionnel'],
      ar: ['يوفر وقت البحث عن العناصر', 'يقلل الحركة غير الضرورية', 'يحسن سير العمل', 'يزيد الإنتاجية', 'يخلق بيئة مهنية']
    },
    keyPrinciple: {
      en: 'A place for everything, and everything in its place!',
      fr: 'Une place pour chaque chose, et chaque chose à sa place!',
      ar: 'مكان لكل شيء، وكل شيء في مكانه!'
    }
  },
  { 
    id: 'seiso', 
    name: { en: 'Seiso (Shine)', fr: 'Seiso (Nettoyer)', ar: 'سيسو (التنظيف)' },
    emoji: '🧹',
    color: '#45B7D1',
    description: {
      en: 'Clean and inspect work area',
      fr: 'Nettoyer et inspecter la zone de travail',
      ar: 'تنظيف وفحص منطقة العمل'
    },
    details: {
      en: 'Regular cleaning helps identify problems early and maintains a safe environment. A clean workplace is a safe workplace. Use cleaning as an inspection opportunity to spot leaks, damage, or wear before they become major problems.',
      fr: 'Un nettoyage régulier aide à identifier les problèmes rapidement et maintient un environnement sûr. Un lieu de travail propre est un lieu de travail sûr. Utilisez le nettoyage comme une opportunité d\'inspection pour repérer les fuites, les dommages ou l\'usure avant qu\'ils ne deviennent des problèmes majeurs.',
      ar: 'يساعد التنظيف المنتظم في تحديد المشاكل مبكراً والحفاظ على بيئة آمنة. مكان العمل النظيف هو مكان عمل آمن. استخدم التنظيف كفرصة للفحص لاكتشاف التسريبات أو التلف أو التآكل قبل أن تصبح مشاكل كبيرة.'
    },
    examples: {
      en: ['Sweep and mop floors daily', 'Clean equipment after each use', 'Inspect machinery for leaks regularly', 'Wipe down work surfaces', 'Maintain cleaning checklists'],
      fr: ['Balayer et laver les sols quotidiennement', 'Nettoyer l\'équipement après chaque utilisation', 'Inspecter régulièrement les machines pour les fuites', 'Essuyer les surfaces de travail', 'Maintenir des listes de contrôle de nettoyage'],
      ar: ['كنس ومسح الأرضيات يومياً', 'تنظيف المعدات بعد كل استخدام', 'فحص الآلات بانتظام بحثاً عن تسريبات', 'مسح أسطح العمل', 'الحفاظ على قوائم مراجعة التنظيف']
    },
    benefits: {
      en: ['Improves workplace safety', 'Extends equipment life', 'Identifies problems early', 'Creates pleasant environment', 'Reduces maintenance costs'],
      fr: ['Améliore la sécurité au travail', 'Prolonge la durée de vie des équipements', 'Identifie les problèmes tôt', 'Crée un environnement agréable', 'Réduit les coûts de maintenance'],
      ar: ['يحسن السلامة في مكان العمل', 'يطيل عمر المعدات', 'يحدد المشاكل مبكراً', 'يخلق بيئة ممتعة', 'يقلل تكاليف الصيانة']
    },
    keyPrinciple: {
      en: 'Clean to understand, clean to inspect!',
      fr: 'Nettoyer pour comprendre, nettoyer pour inspecter!',
      ar: 'نظف لتتفهم، نظف لتفحص!'
    }
  },
  { 
    id: 'seiketsu', 
    name: { en: 'Seiketsu (Standardize)', fr: 'Seiketsu (Standardiser)', ar: 'سيكيتسو (التوحيد)' },
    emoji: '📐',
    color: '#96CEB4',
    description: {
      en: 'Create standards and procedures',
      fr: 'Créer des standards et procédures',
      ar: 'إنشاء معايير وإجراءات'
    },
    details: {
      en: 'Document best practices and establish clear procedures to maintain organization. Standardization ensures consistency and sustainability. Create visual standards that make abnormalities obvious to everyone.',
      fr: 'Documentez les meilleures pratiques et établissez des procédures claires pour maintenir l\'organisation. La standardisation assure la cohérence et la durabilité. Créez des standards visuels qui rendent les anomalies évidentes pour tous.',
      ar: 'توثيق أفضل الممارسات ووضع إجراءات واضحة للحفاظ على التنظيم. التوحيد يضمن الاتساق والاستدامة. إنشاء معايير بصرية تجعل الحالات الشاذة واضحة للجميع.'
    },
    examples: {
      en: ['Create cleaning schedules', 'Write standard operating procedures (SOPs)', 'Post visual guides in work area', 'Create checklists for daily tasks', 'Implement 5S audit checklists'],
      fr: ['Créer des calendriers de nettoyage', 'Rédiger des procédures opérationnelles standard', 'Afficher des guides visuels dans la zone de travail', 'Créer des listes de contrôle pour les tâches quotidiennes', 'Mettre en place des listes de contrôle d\'audit 5S'],
      ar: ['إنشاء جداول التنظيف', 'كتابة إجراءات التشغيل القياسية', 'نشر أدلة بصرية في منطقة العمل', 'إنشاء قوائم مرجعية للمهام اليومية', 'تنفيذ قوائم تدقيق 5S']
    },
    benefits: {
      en: ['Ensures consistency across teams', 'Simplifies training for new employees', 'Maintains high standards', 'Improves quality', 'Makes abnormalities visible'],
      fr: ['Assure la cohérence entre les équipes', 'Simplifie la formation des nouveaux employés', 'Maintient des standards élevés', 'Améliore la qualité', 'Rend les anomalies visibles'],
      ar: ['يضمن الاتساق بين الفرق', 'يبسط تدريب الموظفين الجدد', 'يحافظ على معايير عالية', 'يحسن الجودة', 'يجعل الحالات الشاذة مرئية']
    },
    keyPrinciple: {
      en: 'Make the abnormal visible!',
      fr: 'Rendez l\'anormal visible!',
      ar: 'اجعل غير الطبيعي مرئياً!'
    }
  },
  { 
    id: 'shitsuke', 
    name: { en: 'Shitsuke (Sustain)', fr: 'Shitsuke (Maintenir)', ar: 'شيتسوكي (الاستدامة)' },
    emoji: '🔄',
    color: '#FFD93D',
    description: {
      en: 'Maintain discipline and continuous improvement',
      fr: 'Maintenir la discipline et l\'amélioration continue',
      ar: 'الحفاظ على الانضباط والتحسين المستمر'
    },
    details: {
      en: 'Make 5S a habit through regular training, audits, and leadership commitment. Continuously improve processes and sustain the gains achieved. This is the most challenging step as it requires ongoing discipline and engagement from everyone.',
      fr: 'Faites de la méthode 5S une habitude grâce à des formations, des audits et un engagement de la direction. Améliorez continuellement les processus et maintenez les gains réalisés. C\'est l\'étape la plus difficile car elle nécessite une discipline et un engagement continus de tous.',
      ar: 'جعل 5S عادة من خلال التدريب المنتظم والتدقيق والتزام القيادة. تحسين العمليات باستمرار والحفاظ على المكاسب المحققة. هذه هي الخطوة الأكثر تحدياً لأنها تتطلب انضباطاً مستمراً ومشاركة من الجميع.'
    },
    examples: {
      en: ['Conduct regular 5S audits', 'Provide ongoing training', 'Celebrate successes and share best practices', 'Review and update procedures', 'Maintain daily 5S habits'],
      fr: ['Effectuer des audits 5S réguliers', 'Fournir une formation continue', 'Célébrer les succès et partager les meilleures pratiques', 'Réviser et mettre à jour les procédures', 'Maintenir des habitudes 5S quotidiennes'],
      ar: ['إجراء عمليات تدقيق 5S منتظمة', 'تقديم تدريب مستمر', 'الاحتفال بالنجاحات ومشاركة أفضل الممارسات', 'مراجعة وتحديث الإجراءات', 'الحفاظ على عادات 5S اليومية']
    },
    benefits: {
      en: ['Creates lasting organizational habits', 'Ensures continuous improvement', 'Builds a culture of excellence', 'Prevents regression to old habits', 'Engages all employees'],
      fr: ['Crée des habitudes organisationnelles durables', 'Assure l\'amélioration continue', 'Construit une culture d\'excellence', 'Prévient la régression vers les anciennes habitudes', 'Engage tous les employés'],
      ar: ['يخلق عادات تنظيمية دائمة', 'يضمن التحسين المستمر', 'يبني ثقافة التميز', 'يمنع التراجع إلى العادات القديمة', 'يشمل جميع الموظفين']
    },
    keyPrinciple: {
      en: 'Make 5S a way of life!',
      fr: 'Faites de la 5S un mode de vie!',
      ar: 'اجعل 5S أسلوب حياة!'
    }
  }
];
