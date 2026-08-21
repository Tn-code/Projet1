export const FORMATION_DATA = {
  entreprise: {
    id: 'entreprise',
    name: {
      en: '🏢 Enterprise 5S',
      fr: '🏢 5S Entreprise',
      ar: '🏢 5S المؤسسة'
    },
    levels: [
      {
        id: 'level1',
        name: {
          en: 'Introduction to 5S',
          fr: 'Introduction au 5S',
          ar: 'مقدمة عن 5S'
        },
        content: {
          en: `
            <h3>What is 5S?</h3>
            <p>5S is a workplace organization method that uses a list of five Japanese words: Seiri, Seiton, Seiso, Seiketsu, and Shitsuke.</p>
            <ul>
              <li><strong>Seiri (Sort):</strong> Eliminate unnecessary items</li>
              <li><strong>Seiton (Set in order):</strong> Organize and arrange properly</li>
              <li><strong>Seiso (Shine):</strong> Clean and inspect</li>
              <li><strong>Seiketsu (Standardize):</strong> Create standards and procedures</li>
              <li><strong>Shitsuke (Sustain):</strong> Maintain discipline and continuous improvement</li>
            </ul>
            <h4>Benefits of 5S:</h4>
            <ul>
              <li>Increased productivity</li>
              <li>Improved safety</li>
              <li>Reduced waste</li>
              <li>Better quality</li>
              <li>Enhanced employee morale</li>
            </ul>
          `,
          fr: `
            <h3>Qu'est-ce que le 5S ?</h3>
            <p>La méthode 5S est une méthode d'organisation du lieu de travail qui utilise une liste de cinq mots japonais : Seiri, Seiton, Seiso, Seiketsu et Shitsuke.</p>
            <ul>
              <li><strong>Seiri (Trier) :</strong> Éliminer ce qui est inutile</li>
              <li><strong>Seiton (Ranger) :</strong> Organiser et ranger correctement</li>
              <li><strong>Seiso (Nettoyer) :</strong> Nettoyer et inspecter</li>
              <li><strong>Seiketsu (Standardiser) :</strong> Créer des standards et procédures</li>
              <li><strong>Shitsuke (Maintenir) :</strong> Maintenir la discipline et l'amélioration continue</li>
            </ul>
            <h4>Avantages du 5S :</h4>
            <ul>
              <li>Productivité accrue</li>
              <li>Sécurité améliorée</li>
              <li>Réduction des déchets</li>
              <li>Meilleure qualité</li>
              <li>Moral des employés renforcé</li>
            </ul>
          `,
          ar: `
            <h3>ما هو 5S؟</h3>
            <p>5S هي طريقة لتنظيم مكان العمل تستخدم قائمة من خمس كلمات يابانية: سيري، سيتون، سيسو، سيكيتسو، وشيتسوكي.</p>
            <ul>
              <li><strong>سيري (الفرز):</strong> التخلص من العناصر غير الضرورية</li>
              <li><strong>سيتون (الترتيب):</strong> تنظيم وترتيب بشكل صحيح</li>
              <li><strong>سيسو (التنظيف):</strong> التنظيف والفحص</li>
              <li><strong>سيكيتسو (التوحيد):</strong> إنشاء معايير وإجراءات</li>
              <li><strong>شيتسوكي (الاستدامة):</strong> الحفاظ على الانضباط والتحسين المستمر</li>
            </ul>
            <h4>فوائد 5S:</h4>
            <ul>
              <li>زيادة الإنتاجية</li>
              <li>تحسين السلامة</li>
              <li>تقليل النفايات</li>
              <li>جودة أفضل</li>
              <li>تعزيز معنويات الموظفين</li>
            </ul>
          `
        },
        duration: { en: '1 hour', fr: '1 heure', ar: 'ساعة واحدة' }
      },
      {
        id: 'level2',
        name: {
          en: 'Implementing 5S in the Workplace',
          fr: 'Mise en œuvre du 5S sur le lieu de travail',
          ar: 'تنفيذ 5S في مكان العمل'
        },
        content: {
          en: `
            <h3>Steps to Implement 5S</h3>
            <ol>
              <li><strong>Assessment:</strong> Evaluate current workplace conditions</li>
              <li><strong>Planning:</strong> Develop an implementation plan</li>
              <li><strong>Training:</strong> Train all employees on 5S principles</li>
              <li><strong>Execution:</strong> Implement each step systematically</li>
              <li><strong>Audit:</strong> Regular audits to ensure compliance</li>
              <li><strong>Sustain:</strong> Continuous improvement and maintenance</li>
            </ol>
            <h4>Key Success Factors:</h4>
            <ul>
              <li>Management commitment</li>
              <li>Employee involvement</li>
              <li>Regular communication</li>
              <li>Visual management</li>
              <li>Continuous training</li>
            </ul>
          `,
          fr: `
            <h3>Étapes pour mettre en œuvre le 5S</h3>
            <ol>
              <li><strong>Évaluation :</strong> Évaluer les conditions actuelles du lieu de travail</li>
              <li><strong>Planification :</strong> Élaborer un plan de mise en œuvre</li>
              <li><strong>Formation :</strong> Former tous les employés aux principes 5S</li>
              <li><strong>Exécution :</strong> Mettre en œuvre chaque étape systématiquement</li>
              <li><strong>Audit :</strong> Audits réguliers pour assurer la conformité</li>
              <li><strong>Maintenir :</strong> Amélioration continue et maintenance</li>
            </ol>
            <h4>Facteurs clés de succès :</h4>
            <ul>
              <li>Engagement de la direction</li>
              <li>Implication des employés</li>
              <li>Communication régulière</li>
              <li>Gestion visuelle</li>
              <li>Formation continue</li>
            </ul>
          `,
          ar: `
            <h3>خطوات تنفيذ 5S</h3>
            <ol>
              <li><strong>التقييم:</strong> تقييم ظروف مكان العمل الحالية</li>
              <li><strong>التخطيط:</strong> وضع خطة تنفيذ</li>
              <li><strong>التدريب:</strong> تدريب جميع الموظفين على مبادئ 5S</li>
              <li><strong>التنفيذ:</strong> تنفيذ كل خطوة بشكل منهجي</li>
              <li><strong>التدقيق:</strong> تدقيق منتظم لضمان الامتثال</li>
              <li><strong>الاستدامة:</strong> التحسين المستمر والصيانة</li>
            </ol>
            <h4>عوامل النجاح الرئيسية:</h4>
            <ul>
              <li>التزام الإدارة</li>
              <li>مشاركة الموظفين</li>
              <li>التواصل المنتظم</li>
              <li>الإدارة البصرية</li>
              <li>التدريب المستمر</li>
            </ul>
          `
        },
        duration: { en: '2 hours', fr: '2 heures', ar: 'ساعتان' }
      },
      {
        id: 'level3',
        name: {
          en: 'Advanced 5S Techniques',
          fr: 'Techniques 5S Avancées',
          ar: 'تقنيات 5S المتقدمة'
        },
        content: {
          en: `
            <h3>Advanced 5S Techniques</h3>
            <ul>
              <li><strong>Visual Management:</strong> Using visual tools to manage workplace</li>
              <li><strong>Standardized Work:</strong> Creating work standards</li>
              <li><strong>Lean Manufacturing:</strong> Combining 5S with lean principles</li>
              <li><strong>Total Productive Maintenance:</strong> Equipment maintenance</li>
              <li><strong>Kaizen:</strong> Continuous improvement culture</li>
            </ul>
            <h4>Tools and Techniques:</h4>
            <ul>
              <li>Visual control boards</li>
              <li>Checklists and SOPs</li>
              <li>Shadow boards for tools</li>
              <li>Color coding systems</li>
              <li>Kanban systems</li>
            </ul>
          `,
          fr: `
            <h3>Techniques 5S Avancées</h3>
            <ul>
              <li><strong>Gestion Visuelle :</strong> Utiliser des outils visuels pour gérer le lieu de travail</li>
              <li><strong>Travail Standardisé :</strong> Créer des standards de travail</li>
              <li><strong>Lean Manufacturing :</strong> Combiner 5S avec les principes Lean</li>
              <li><strong>Maintenance Productive Totale :</strong> Maintenance des équipements</li>
              <li><strong>Kaizen :</strong> Culture d'amélioration continue</li>
            </ul>
            <h4>Outils et Techniques :</h4>
            <ul>
              <li>Tableaux de contrôle visuels</li>
              <li>Listes de contrôle et SOP</li>
              <li>Tableaux d'ombre pour les outils</li>
              <li>Systèmes de code couleur</li>
              <li>Systèmes Kanban</li>
            </ul>
          `,
          ar: `
            <h3>تقنيات 5S المتقدمة</h3>
            <ul>
              <li><strong>الإدارة البصرية:</strong> استخدام الأدوات البصرية لإدارة مكان العمل</li>
              <li><strong>العمل الموحد:</strong> إنشاء معايير العمل</li>
              <li><strong>التصنيع الخالي من الهدر:</strong> دمج 5S مع مبادئ اللين</li>
              <li><strong>الصيانة الإنتاجية الشاملة:</strong> صيانة المعدات</li>
              <li><strong>كايزن:</strong> ثقافة التحسين المستمر</li>
            </ul>
            <h4>الأدوات والتقنيات:</h4>
            <ul>
              <li>لوحات التحكم البصرية</li>
              <li>قوائم المراجعة وإجراءات التشغيل القياسية</li>
              <li>لوحات الظل للأدوات</li>
              <li>أنظمة الترميز اللوني</li>
              <li>أنظمة كانبان</li>
            </ul>
          `
        },
        duration: { en: '3 hours', fr: '3 heures', ar: '3 ساعات' }
      }
    ]
  },
  poste: {
    id: 'poste',
    name: {
      en: '🔧 Poste 5S',
      fr: '🔧 5S Poste de Travail',
      ar: '🔧 5S محطة العمل'
    },
    levels: [
      {
        id: 'level1',
        name: {
          en: 'Individual Workstation 5S',
          fr: '5S du Poste de Travail Individuel',
          ar: '5S محطة العمل الفردية'
        },
        content: {
          en: `
            <h3>5S for Your Workstation</h3>
            <p>Apply 5S principles to your individual workstation:</p>
            <ul>
              <li><strong>Sort:</strong> Remove unnecessary items from your workspace</li>
              <li><strong>Set in Order:</strong> Organize tools for easy access</li>
              <li><strong>Shine:</strong> Keep your workspace clean</li>
              <li><strong>Standardize:</strong> Create daily routines</li>
              <li><strong>Sustain:</strong> Maintain habits</li>
            </ul>
            <h4>Daily 5S Checklist:</h4>
            <ul>
              <li>Clean desk and equipment</li>
              <li>Organize files and documents</li>
              <li>Check tools and materials</li>
              <li>Update visual boards</li>
              <li>Plan next day's tasks</li>
            </ul>
          `,
          fr: `
            <h3>5S pour Votre Poste de Travail</h3>
            <p>Appliquez les principes 5S à votre poste de travail individuel :</p>
            <ul>
              <li><strong>Trier :</strong> Retirer les éléments inutiles de votre espace de travail</li>
              <li><strong>Ranger :</strong> Organiser les outils pour un accès facile</li>
              <li><strong>Nettoyer :</strong> Garder votre espace de travail propre</li>
              <li><strong>Standardiser :</strong> Créer des routines quotidiennes</li>
              <li><strong>Maintenir :</strong> Maintenir les habitudes</li>
            </ul>
            <h4>Liste de Contrôle 5S Quotidienne :</h4>
            <ul>
              <li>Nettoyer le bureau et l'équipement</li>
              <li>Organiser les fichiers et documents</li>
              <li>Vérifier les outils et matériaux</li>
              <li>Mettre à jour les tableaux visuels</li>
              <li>Planifier les tâches du lendemain</li>
            </ul>
          `,
          ar: `
            <h3>5S لمحطة العمل الخاصة بك</h3>
            <p>تطبيق مبادئ 5S على محطة العمل الفردية الخاصة بك:</p>
            <ul>
              <li><strong>الفرز:</strong> إزالة العناصر غير الضرورية من مساحة العمل</li>
              <li><strong>الترتيب:</strong> تنظيم الأدوات لسهولة الوصول</li>
              <li><strong>التنظيف:</strong> الحفاظ على نظافة مساحة العمل</li>
              <li><strong>التوحيد:</strong> إنشاء روتين يومي</li>
              <li><strong>الاستدامة:</strong> الحفاظ على العادات</li>
            </ul>
            <h4>قائمة مراجعة 5S اليومية:</h4>
            <ul>
              <li>تنظيف المكتب والمعدات</li>
              <li>تنظيم الملفات والمستندات</li>
              <li>فحص الأدوات والمواد</li>
              <li>تحديث اللوحات البصرية</li>
              <li>تخطيط مهام اليوم التالي</li>
            </ul>
          `
        },
        duration: { en: '45 min', fr: '45 min', ar: '45 دقيقة' }
      },
      {
        id: 'level2',
        name: {
          en: 'Workplace Organization',
          fr: 'Organisation du Lieu de Travail',
          ar: 'تنظيم مكان العمل'
        },
        content: {
          en: `
            <h3>Organizing Your Work Environment</h3>
            <ul>
              <li><strong>Tool Placement:</strong> Tools should be within arm's reach</li>
              <li><strong>Material Flow:</strong> Optimize material movement</li>
              <li><strong>Visual Controls:</strong> Use labels and signs</li>
              <li><strong>Ergonomics:</strong> Design for comfort and efficiency</li>
              <li><strong>Safety:</strong> Identify and eliminate hazards</li>
            </ul>
            <h4>Best Practices:</h4>
            <ul>
              <li>Color code tool locations</li>
              <li>Use shadow boards for tools</li>
              <li>Label storage areas clearly</li>
              <li>Create visual work instructions</li>
              <li>Implement 5S audits</li>
            </ul>
          `,
          fr: `
            <h3>Organisation de Votre Environnement de Travail</h3>
            <ul>
              <li><strong>Placement des Outils :</strong> Les outils doivent être à portée de main</li>
              <li><strong>Flux de Matériaux :</strong> Optimiser le mouvement des matériaux</li>
              <li><strong>Contrôles Visuels :</strong> Utiliser des étiquettes et des panneaux</li>
              <li><strong>Ergonomie :</strong> Concevoir pour le confort et l'efficacité</li>
              <li><strong>Sécurité :</strong> Identifier et éliminer les dangers</li>
            </ul>
            <h4>Bonnes Pratiques :</h4>
            <ul>
              <li>Code couleur pour les emplacements des outils</li>
              <li>Utiliser des tableaux d'ombre pour les outils</li>
              <li>Étiqueter clairement les zones de stockage</li>
              <li>Créer des instructions de travail visuelles</li>
              <li>Mettre en œuvre des audits 5S</li>
            </ul>
          `,
          ar: `
            <h3>تنظيم بيئة العمل الخاصة بك</h3>
            <ul>
              <li><strong>وضع الأدوات:</strong> يجب أن تكون الأدوات في متناول اليد</li>
              <li><strong>تدفق المواد:</strong> تحسين حركة المواد</li>
              <li><strong>الضوابط البصرية:</strong> استخدام الملصقات واللافتات</li>
              <li><strong>بيئة العمل:</strong> التصميم للراحة والكفاءة</li>
              <li><strong>السلامة:</strong> تحديد وإزالة المخاطر</li>
            </ul>
            <h4>أفضل الممارسات:</h4>
            <ul>
              <li>الترميز اللوني لمواقع الأدوات</li>
              <li>استخدام لوحات الظل للأدوات</li>
              <li>وضع ملصقات واضحة على مناطق التخزين</li>
              <li>إنشاء تعليمات عمل بصرية</li>
              <li>تنفيذ عمليات تدقيق 5S</li>
            </ul>
          `
        },
        duration: { en: '1.5 hours', fr: '1.5 heures', ar: '1.5 ساعة' }
      },
      {
        id: 'level3',
        name: {
          en: 'Advanced Poste 5S',
          fr: '5S Poste Avancé',
          ar: '5S محطة العمل المتقدمة'
        },
        content: {
          en: `
            <h3>Advanced Workstation Optimization</h3>
            <ul>
              <li><strong>Lean Principles:</strong> Eliminate waste in your workspace</li>
              <li><strong>Standardized Work:</strong> Create standard work procedures</li>
              <li><strong>Visual Management:</strong> Advanced visual management techniques</li>
              <li><strong>Continuous Improvement:</strong> Kaizen at the workstation level</li>
              <li><strong>Performance Metrics:</strong> Measure and improve performance</li>
            </ul>
            <h4>Advanced Tools:</h4>
            <ul>
              <li>Andon systems for immediate feedback</li>
              <li>Jidoka (automation with human touch)</li>
              <li>Poka-Yoke (error-proofing)</li>
              <li>Kanban for material replenishment</li>
              <li>5S maturity assessment</li>
            </ul>
          `,
          fr: `
            <h3>Optimisation Avancée du Poste de Travail</h3>
            <ul>
              <li><strong>Principes Lean :</strong> Éliminer les déchets dans votre espace de travail</li>
              <li><strong>Travail Standardisé :</strong> Créer des procédures de travail standard</li>
              <li><strong>Gestion Visuelle :</strong> Techniques avancées de gestion visuelle</li>
              <li><strong>Amélioration Continue :</strong> Kaizen au niveau du poste de travail</li>
              <li><strong>Métriques de Performance :</strong> Mesurer et améliorer la performance</li>
            </ul>
            <h4>Outils Avancés :</h4>
            <ul>
              <li>Systèmes Andon pour un retour immédiat</li>
              <li>Jidoka (automatisation avec touche humaine)</li>
              <li>Poka-Yoke (anti-erreur)</li>
              <li>Kanban pour le réapprovisionnement</li>
              <li>Évaluation de maturité 5S</li>
            </ul>
          `,
          ar: `
            <h3>تحسين محطة العمل المتقدمة</h3>
            <ul>
              <li><strong>مبادئ اللين:</strong> التخلص من الهدر في مساحة العمل</li>
              <li><strong>العمل الموحد:</strong> إنشاء إجراءات عمل موحدة</li>
              <li><strong>الإدارة البصرية:</strong> تقنيات الإدارة البصرية المتقدمة</li>
              <li><strong>التحسين المستمر:</strong> كايزن على مستوى محطة العمل</li>
              <li><strong>مقاييس الأداء:</strong> قياس وتحسين الأداء</li>
            </ul>
            <h4>الأدوات المتقدمة:</h4>
            <ul>
              <li>أنظمة أندون للتغذية الراجعة الفورية</li>
              <li>جيدوكا (الأتمتة مع اللمسة البشرية)</li>
              <li>بوكا يوكي (منع الأخطاء)</li>
              <li>كانبان لإعادة التموين</li>
              <li>تقييم نضج 5S</li>
            </ul>
          `
        },
        duration: { en: '2.5 hours', fr: '2.5 heures', ar: '2.5 ساعة' }
      }
    ]
  }
};
