export const FORMATION_DATA = {
  entreprise: {
    id: 'entreprise',
    name: {
      en: '🏢 Enterprise 5S Training',
      fr: '🏢 Formation 5S Entreprise',
      ar: '🏢 تدريب 5S المؤسسة'
    },
    levels: [
      {
        id: 'level1',
        name: {
          en: '🎯 5S for Operators - 30 min',
          fr: '🎯 5S pour Opérateurs - 30 min',
          ar: '🎯 5S للمشغلين - 30 دقيقة'
        },
        duration: { en: '30 minutes', fr: '30 minutes', ar: '30 دقيقة' },
        type: 'training',
        content: {
          en: `
            <h2>🎯 5S Training for Operators</h2>
            <p><strong>Duration:</strong> 30 minutes</p>
            <p><strong>Objective:</strong> Master the 5S methodology to improve your workstation efficiency</p>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📋 What is 5S?</h3>
            <p>5S is a workplace organization method that creates a clean, organized, and efficient work environment.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
              <div style="background: #f0f4ff; padding: 10px; border-radius: 8px;">
                <strong>🇯🇵 Japanese</strong>
                <p style="font-size: 12px; margin: 5px 0;">Seiri • Seiton • Seiso • Seiketsu • Shitsuke</p>
              </div>
              <div style="background: #f0f4ff; padding: 10px; border-radius: 8px;">
                <strong>🇬🇧 English</strong>
                <p style="font-size: 12px; margin: 5px 0;">Sort • Set • Shine • Standardize • Sustain</p>
              </div>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🔴 1. Seiri (Sort) - 5 min</h3>
            <p><strong>Goal:</strong> Eliminate unnecessary items from your workstation</p>
            <ul>
              <li>✅ Identify all items in your workspace</li>
              <li>✅ Remove broken or unused tools</li>
              <li>✅ Separate needed from unneeded items</li>
              <li>✅ Use the "Red Tag" technique</li>
            </ul>
            <div style="background: #fef3c7; padding: 10px; border-radius: 8px; margin: 10px 0;">
              <strong>💡 Action:</strong> Take 2 minutes to remove 3 unnecessary items from your desk
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📦 2. Seiton (Set in Order) - 5 min</h3>
            <p><strong>Goal:</strong> Organize items for easy access and efficiency</p>
            <ul>
              <li>✅ Create designated places for everything</li>
              <li>✅ Label storage areas clearly</li>
              <li>✅ Arrange tools by frequency of use</li>
              <li>✅ Implement shadow boards</li>
            </ul>
            <div style="background: #dbeafe; padding: 10px; border-radius: 8px; margin: 10px 0;">
              <strong>💡 Action:</strong> Organize your tools - place frequently used items within arm's reach
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🧹 3. Seiso (Shine) - 5 min</h3>
            <p><strong>Goal:</strong> Clean and inspect your workplace</p>
            <ul>
              <li>✅ Clean all surfaces and equipment</li>
              <li>✅ Inspect for problems during cleaning</li>
              <li>✅ Create a cleaning schedule</li>
              <li>✅ Maintain a spotless workspace</li>
            </ul>
            <div style="background: #d1fae5; padding: 10px; border-radius: 8px; margin: 10px 0;">
              <strong>💡 Action:</strong> Clean your workstation and note any issues you find
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📐 4. Seiketsu (Standardize) - 5 min</h3>
            <p><strong>Goal:</strong> Create standards and procedures</p>
            <ul>
              <li>✅ Document best practices</li>
              <li>✅ Create visual guides and checklists</li>
              <li>✅ Establish daily routines</li>
              <li>✅ Make abnormalities visible</li>
            </ul>
            <div style="background: #fce7f3; padding: 10px; border-radius: 8px; margin: 10px 0;">
              <strong>💡 Action:</strong> Create a 5S checklist for your daily routine
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🔄 5. Shitsuke (Sustain) - 5 min</h3>
            <p><strong>Goal:</strong> Maintain and continuously improve</p>
            <ul>
              <li>✅ Make 5S a daily habit</li>
              <li>✅ Conduct regular self-audits</li>
              <li>✅ Share best practices with colleagues</li>
              <li>✅ Continuously improve your workspace</li>
            </ul>
            <div style="background: #e0e7ff; padding: 10px; border-radius: 8px; margin: 10px 0;">
              <strong>💡 Action:</strong> Commit to 5 minutes of 5S at the start and end of each shift
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>✅ 5S Daily Checklist</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 2px solid #667eea;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background: #667eea; color: white;">
                  <th style="padding: 8px; text-align: left;">Task</th>
                  <th style="padding: 8px; text-align: center;">✓</th>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px;">Clear workspace of unnecessary items</td>
                  <td style="padding: 8px; text-align: center;">☐</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px;">Organize tools and materials</td>
                  <td style="padding: 8px; text-align: center;">☐</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px;">Clean work surfaces</td>
                  <td style="padding: 8px; text-align: center;">☐</td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 8px;">Check equipment condition</td>
                  <td style="padding: 8px; text-align: center;">☐</td>
                </tr>
                <tr>
                  <td style="padding: 8px;">Review and improve processes</td>
                  <td style="padding: 8px; text-align: center;">☐</td>
                </tr>
              </table>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🏆 Benefits of 5S</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin: 15px 0;">
              <div style="background: #d1fae5; padding: 12px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px;">⚡</div>
                <div style="font-weight: 600; font-size: 14px;">Productivity</div>
                <div style="font-size: 12px; color: #5a6a7a;">Reduce wasted time</div>
              </div>
              <div style="background: #dbeafe; padding: 12px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px;">🛡️</div>
                <div style="font-weight: 600; font-size: 14px;">Safety</div>
                <div style="font-size: 12px; color: #5a6a7a;">Fewer accidents</div>
              </div>
              <div style="background: #fce7f3; padding: 12px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px;">💎</div>
                <div style="font-weight: 600; font-size: 14px;">Quality</div>
                <div style="font-size: 12px; color: #5a6a7a;">Better work output</div>
              </div>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🎯 Quiz - Check Your Knowledge</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p><strong>1. What does Seiri mean?</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 5px;">A) Clean and inspect ✓</li>
                <li style="padding: 5px;">B) Sort and eliminate ✓</li>
                <li style="padding: 5px;">C) Organize and arrange ✓</li>
                <li style="padding: 5px;">D) Maintain and sustain ✓</li>
              </ul>
              <p style="margin-top: 10px;"><strong>2. How often should you perform 5S?</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 5px;">A) Once a year</li>
                <li style="padding: 5px;">B) Every month</li>
                <li style="padding: 5px;">C) Daily ✓</li>
                <li style="padding: 5px;">D) Never</li>
              </ul>
              <p style="margin-top: 10px;"><strong>3. What is the benefit of Seiton?</strong></p>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 5px;">A) Saves time finding tools ✓</li>
                <li style="padding: 5px;">B) Makes cleaning harder</li>
                <li style="padding: 5px;">C) Creates more waste</li>
                <li style="padding: 5px;">D) Increases cost</li>
              </ul>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 12px; text-align: center;">
              <h3 style="color: white;">🎉 Congratulations!</h3>
              <p>You've completed the 30-minute 5S training for operators!</p>
              <p style="font-size: 14px; opacity: 0.9; margin-top: 10px;">
                Remember: 5S is not a one-time activity, but a daily habit for continuous improvement.
              </p>
              <div style="margin-top: 15px; font-size: 32px;">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          `,
          fr: `
            <h2>🎯 Formation 5S pour Opérateurs</h2>
            <p><strong>Durée:</strong> 30 minutes</p>
            <p><strong>Objectif:</strong> Maîtriser la méthodologie 5S pour améliorer l'efficacité de votre poste de travail</p>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📋 Qu'est-ce que le 5S ?</h3>
            <p>La méthode 5S est une méthode d'organisation du lieu de travail qui crée un environnement de travail propre, organisé et efficace.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
              <div style="background: #f0f4ff; padding: 10px; border-radius: 8px;">
                <strong>🇯🇵 Japonais</strong>
                <p style="font-size: 12px; margin: 5px 0;">Seiri • Seiton • Seiso • Seiketsu • Shitsuke</p>
              </div>
              <div style="background: #f0f4ff; padding: 10px; border-radius: 8px;">
                <strong>🇫🇷 Français</strong>
                <p style="font-size: 12px; margin: 5px 0;">Trier • Ranger • Nettoyer • Standardiser • Maintenir</p>
              </div>
            </div>
            
            <!-- Continue with French translation of all sections -->
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🔴 1. Seiri (Trier) - 5 min</h3>
            <p><strong>Objectif:</strong> Éliminer les éléments inutiles de votre poste de travail</p>
            <ul>
              <li>✅ Identifier tous les articles dans votre espace de travail</li>
              <li>✅ Retirer les outils cassés ou inutilisés</li>
              <li>✅ Séparer les articles nécessaires des inutiles</li>
              <li>✅ Utiliser la technique du "Tag Rouge"</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📦 2. Seiton (Ranger) - 5 min</h3>
            <p><strong>Objectif:</strong> Organiser les articles pour un accès facile et une efficacité maximale</p>
            <ul>
              <li>✅ Créer des emplacements désignés pour tout</li>
              <li>✅ Étiqueter clairement les zones de stockage</li>
              <li>✅ Organiser les outils par fréquence d'utilisation</li>
              <li>✅ Mettre en place des tableaux d'ombre</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🧹 3. Seiso (Nettoyer) - 5 min</h3>
            <p><strong>Objectif:</strong> Nettoyer et inspecter votre lieu de travail</p>
            <ul>
              <li>✅ Nettoyer toutes les surfaces et équipements</li>
              <li>✅ Inspecter pour détecter les problèmes lors du nettoyage</li>
              <li>✅ Créer un calendrier de nettoyage</li>
              <li>✅ Maintenir un espace de travail impeccable</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📐 4. Seiketsu (Standardiser) - 5 min</h3>
            <p><strong>Objectif:</strong> Créer des standards et des procédures</p>
            <ul>
              <li>✅ Documenter les meilleures pratiques</li>
              <li>✅ Créer des guides visuels et des listes de contrôle</li>
              <li>✅ Établir des routines quotidiennes</li>
              <li>✅ Rendre les anomalies visibles</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🔄 5. Shitsuke (Maintenir) - 5 min</h3>
            <p><strong>Objectif:</strong> Maintenir et améliorer continuellement</p>
            <ul>
              <li>✅ Faire du 5S une habitude quotidienne</li>
              <li>✅ Effectuer des auto-audits réguliers</li>
              <li>✅ Partager les bonnes pratiques avec les collègues</li>
              <li>✅ Améliorer continuellement votre espace de travail</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 12px; text-align: center;">
              <h3 style="color: white;">🎉 Félicitations !</h3>
              <p>Vous avez terminé la formation 5S de 30 minutes pour opérateurs !</p>
              <p style="font-size: 14px; opacity: 0.9; margin-top: 10px;">
                Rappelez-vous : le 5S n'est pas une activité ponctuelle, mais une habitude quotidienne pour l'amélioration continue.
              </p>
            </div>
          `,
          ar: `
            <h2>🎯 تدريب 5S للمشغلين</h2>
            <p><strong>المدة:</strong> 30 دقيقة</p>
            <p><strong>الهدف:</strong> إتقان منهجية 5S لتحسين كفاءة محطة العمل</p>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📋 ما هو 5S؟</h3>
            <p>5S هي طريقة لتنظيم مكان العمل تخلق بيئة عمل نظيفة ومنظمة وفعالة.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
              <div style="background: #f0f4ff; padding: 10px; border-radius: 8px;">
                <strong>🇯🇵 ياباني</strong>
                <p style="font-size: 12px; margin: 5px 0;">سيري • سيتون • سيسو • سيكيتسو • شيتسوكي</p>
              </div>
              <div style="background: #f0f4ff; padding: 10px; border-radius: 8px;">
                <strong>🇸🇦 عربي</strong>
                <p style="font-size: 12px; margin: 5px 0;">الفرز • الترتيب • التنظيف • التوحيد • الاستدامة</p>
              </div>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🔴 1. سيري (الفرز) - 5 دقائق</h3>
            <p><strong>الهدف:</strong> التخلص من العناصر غير الضرورية في محطة العمل</p>
            <ul>
              <li>✅ تحديد جميع العناصر في مساحة العمل</li>
              <li>✅ إزالة الأدوات المكسورة أو غير المستخدمة</li>
              <li>✅ فصل العناصر الضرورية عن غير الضرورية</li>
              <li>✅ استخدام تقنية "البطاقة الحمراء"</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📦 2. سيتون (الترتيب) - 5 دقائق</h3>
            <p><strong>الهدف:</strong> تنظيم العناصر لسهولة الوصول والكفاءة</p>
            <ul>
              <li>✅ إنشاء أماكن مخصصة لكل شيء</li>
              <li>✅ وضع ملصقات واضحة على مناطق التخزين</li>
              <li>✅ ترتيب الأدوات حسب تكرار الاستخدام</li>
              <li>✅ تنفيذ لوحات الظل</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🧹 3. سيسو (التنظيف) - 5 دقائق</h3>
            <p><strong>الهدف:</strong> تنظيف وفحص مكان العمل</p>
            <ul>
              <li>✅ تنظيف جميع الأسطح والمعدات</li>
              <li>✅ فحص المشاكل أثناء التنظيف</li>
              <li>✅ إنشاء جدول تنظيف</li>
              <li>✅ الحفاظ على مساحة عمل نظيفة</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📐 4. سيكيتسو (التوحيد) - 5 دقائق</h3>
            <p><strong>الهدف:</strong> إنشاء معايير وإجراءات</p>
            <ul>
              <li>✅ توثيق أفضل الممارسات</li>
              <li>✅ إنشاء أدلة بصرية وقوائم مراجعة</li>
              <li>✅ وضع روتين يومي</li>
              <li>✅ جعل الحالات الشاذة مرئية</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🔄 5. شيتسوكي (الاستدامة) - 5 دقائق</h3>
            <p><strong>الهدف:</strong> الحفاظ على التحسين المستمر</p>
            <ul>
              <li>✅ جعل 5S عادة يومية</li>
              <li>✅ إجراء تدقيق ذاتي منتظم</li>
              <li>✅ مشاركة أفضل الممارسات مع الزملاء</li>
              <li>✅ تحسين مساحة العمل باستمرار</li>
            </ul>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 12px; text-align: center;">
              <h3 style="color: white;">🎉 مبروك !</h3>
              <p>لقد أكملت تدريب 5S لمدة 30 دقيقة للمشغلين!</p>
              <p style="font-size: 14px; opacity: 0.9; margin-top: 10px;">
                تذكر: 5S ليس نشاطاً لمرة واحدة، بل عادة يومية للتحسين المستمر.
              </p>
            </div>
          `
        }
      }
    ]
  },
  poste: {
    id: 'poste',
    name: {
      en: '🔧 Poste 5S Training',
      fr: '🔧 Formation 5S Poste de Travail',
      ar: '🔧 تدريب 5S محطة العمل'
    },
    levels: [
      {
        id: 'level1',
        name: {
          en: '🎯 Poste 5S - 30 min',
          fr: '🎯 5S Poste de Travail - 30 min',
          ar: '🎯 5S محطة العمل - 30 دقيقة'
        },
        duration: { en: '30 minutes', fr: '30 minutes', ar: '30 دقيقة' },
        type: 'training',
        content: {
          en: `
            <h2>🔧 Poste 5S Training for Operators</h2>
            <p><strong>Duration:</strong> 30 minutes</p>
            <p><strong>Focus:</strong> Apply 5S to your specific workstation</p>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📍 Your Workstation 5S</h3>
            <p>Apply 5S principles directly to your individual workstation:</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0;">
              <div style="background: #f0f4ff; padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px;">📋</div>
                <h4>Before 5S</h4>
                <ul style="font-size: 13px;">
                  <li>Cluttered workspace</li>
                  <li>Hard to find tools</li>
                  <li>Wasted time searching</li>
                  <li>Unsafe environment</li>
                </ul>
              </div>
              <div style="background: #d1fae5; padding: 15px; border-radius: 8px;">
                <div style="font-size: 24px;">✨</div>
                <h4>After 5S</h4>
                <ul style="font-size: 13px;">
                  <li>Clean and organized</li>
                  <li>Everything in its place</li>
                  <li>Efficient workflow</li>
                  <li>Safe environment</li>
                </ul>
              </div>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>🛠️ Step-by-Step Workstation 5S</h3>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <h4>🔴 Step 1: Sort (5 min)</h4>
              <ul>
                <li>Remove all items from your workstation</li>
                <li>Sort items into: Keep, Move, Discard</li>
                <li>Keep only what you need daily</li>
              </ul>
            </div>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <h4>📦 Step 2: Set in Order (5 min)</h4>
              <ul>
                <li>Designate a place for every item</li>
                <li>Use organizers and labels</li>
                <li>Place frequently used items closest to you</li>
              </ul>
            </div>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <h4>🧹 Step 3: Shine (5 min)</h4>
              <ul>
                <li>Clean your entire workstation</li>
                <li>Wipe down all surfaces</li>
                <li>Check equipment condition</li>
              </ul>
            </div>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <h4>📐 Step 4: Standardize (5 min)</h4>
              <ul>
                <li>Create a workstation layout diagram</li>
                <li>Make a daily cleaning checklist</li>
                <li>Take photos of the ideal setup</li>
              </ul>
            </div>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <h4>🔄 Step 5: Sustain (5 min)</h4>
              <ul>
                <li>Dedicate 5 minutes daily to 5S</li>
                <li>Conduct weekly self-audits</li>
                <li>Share improvements with your team</li>
              </ul>
            </div>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 12px; text-align: center;">
              <h3 style="color: white;">🎉 Poste 5S Complete!</h3>
              <p>Your workstation is now optimized for maximum efficiency!</p>
              <p style="font-size: 14px; opacity: 0.9; margin-top: 10px;">
                Remember: A clean workstation = A productive operator
              </p>
            </div>
          `,
          fr: `
            <h2>🔧 Formation 5S Poste de Travail</h2>
            <p><strong>Durée:</strong> 30 minutes</p>
            <p><strong>Objectif:</strong> Appliquer le 5S à votre poste de travail spécifique</p>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📍 Votre Poste de Travail 5S</h3>
            <p>Appliquez les principes 5S directement à votre poste de travail individuel :</p>
            
            <!-- Continue with French content -->
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 12px; text-align: center;">
              <h3 style="color: white;">🎉 Poste 5S Terminé !</h3>
              <p>Votre poste de travail est maintenant optimisé pour une efficacité maximale !</p>
            </div>
          `,
          ar: `
            <h2>🔧 تدريب 5S محطة العمل</h2>
            <p><strong>المدة:</strong> 30 دقيقة</p>
            <p><strong>التركيز:</strong> تطبيق 5S على محطة العمل الخاصة بك</p>
            
            <hr style="margin: 20px 0; border: 1px solid #e2e8f0;" />
            
            <h3>📍 محطة العمل 5S الخاصة بك</h3>
            <p>تطبيق مبادئ 5S مباشرة على محطة العمل الفردية الخاصة بك:</p>
            
            <!-- Continue with Arabic content -->
            
            <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 12px; text-align: center;">
              <h3 style="color: white;">🎉 تم إكمال 5S محطة العمل!</h3>
              <p>تم الآن تحسين محطة العمل الخاصة بك لتحقيق أقصى كفاءة!</p>
            </div>
          `
        }
      }
    ]
  }
};
