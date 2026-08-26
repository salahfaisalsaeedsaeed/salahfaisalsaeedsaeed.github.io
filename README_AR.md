# Salah Faisal Academic Website — AVESİS-inspired v2

هذه الحزمة هي النسخة متعددة الصفحات الجاهزة لـ Vercel.

## الملفات الأساسية
- `index.html` — الصفحة الرئيسية
- `style.css` — التصميم الموحد
- `script.js` — التفاعل + بيانات المنشورات والمشاريع والجوائز
- مجلدات الصفحات: `about/`, `education/`, `research/`, `publications/`, `projects/`, `experience/`, `teaching/`, `media/`, `achievements/`, `documents/`, `contact/`

## مهم قبل الرفع
1. ضع صورتك الشخصية في جذر المستودع باسم **`myp.jpg`**. إذا لم توجد ستظهر الأحرف SF تلقائيًا.
2. ضع نسخة CV العامة باسم **`Salah_Faisal_CV.pdf`** في جذر المستودع. إذا لم توجد سيمنع الموقع فتح رابط مكسور ويظهر تنبيهًا.
3. لا تحذف `vercel.json`, `robots.txt`, `sitemap.xml`, أو `favicon.svg`.

## أسماء صور الأعمال التي يتعرف عليها الموقع تلقائيًا
ضعها داخل `assets/work/`:
- `robot-arm-computer-vision-cover.jpg`
- `ev-fast-charging-simulink-cover.jpg`
- `embedded-systems-iot-cover.jpg`
- `robotics-lab-development-cover.jpg`
- `research-mentorship-cover.jpg`
- `physics-lab-instrumentation-cover.jpg`
- `industrial-training-nadfood-cover.jpg`
- `industrial-training-genpack-cover.jpg`

صفحة Media تفحص وجود الملف فعليًا؛ الملفات غير الموجودة لا تُظهر صورًا مكسورة.

## النشر
ارفع جميع محتويات هذا المجلد إلى جذر مستودع GitHub المرتبط بمشروع Vercel `salah-faisal`. بعد الـ commit سيعيد Vercel النشر تلقائيًا.

## ملاحظة حول منشورات 2026
تم تحديث الموقع ليعرض أوراق eSmarTA-2026 الأربع الخاصة بك على أنها منشورة في IEEE Xplore وفق أحدث الحالة العامة المتاحة. ثلاثة روابط DOI مباشرة مدخلة، بينما ورقة EV fast-charging البحثية تستخدم حاليًا رابط DOI/IEEE المنشور في LinkedIn لأن رقم DOI المباشر لم يُثبت داخل الملفات المرفقة. يمكن استبداله لاحقًا بسطر واحد في `script.js`.
