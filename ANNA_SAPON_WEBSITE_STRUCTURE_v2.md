# ANNA SAPON — СТРУКТУРА САЙТА
## Премиальный сайт ателье haute couture

---

## 1. АНАЛИЗ РЕФЕРЕНСНОГО ДИЗАЙНА

### Эстетика
- **Стиль**: Минималистичный люкс, editorial fashion
- **Настроение**: Элегантность, уверенность, утончённость
- **Подход**: Чистые линии, много воздуха, акцент на визуалах

### Цветовая палитра (из референса)
- **Основной тёмный**: #2D2D2D (антрацит)
- **Акцент**: #C9A962 (шампань/золото)
- **Фон светлый**: #F7F6F4 (слоновая кость)
- **Фон нейтральный**: #EAEAEA (светло-серый)
- **Текст**: #1A1A1A (почти чёрный)

### Типографика
- **Заголовки**: Serif с характером (Cormorant Garamond, Playfair Display)
- **Навигация/кнопки**: Sans-serif трекинг wide (Montserrat, Didact Gothic)
- **Акценты**: Рукописный логотип Anna Sapon

### Компоновка
- Фиксированный header с прозрачностью → solid при скролле
- Full-width hero секция
- Асимметричные блоки текст + изображение
- Generous whitespace (80-120px между секциями)

---

## 2. РАСПРЕДЕЛЕНИЕ ИЗОБРАЖЕНИЙ ПО СЕКЦИЯМ

| Секция | Файлы изображений |
|--------|-------------------|
| **Header/Logo** | `Logo_Sapon_Anna_main.jpg` |
| **Hero** | `Fashion_model_1.jpg` или `Fashion_model_4-1.jpg` (полноэкранный фон) |
| **О дизайнере** | `Hero_Anna_Sapon_portrait.jpg` |
| **Процесс создания** | `Sapon_process_sketches_3_items.jpg`, `Design2_process2_1sketch.jpg`, `Design2_process2_materials.jpg`, `Design2_process2_model_view1.jpg` |
| **Коллекции — Вечерние** | `Fashion_model_2-1.jpg`, `Fashion_model_3-1.jpg`, `Fashion_model_4-1.jpg`, `Fashion_model_5-1.jpg` |
| **Коллекции — Свадебные** | `Wedding_dress_Sapon_Anna_1-1.jpg`, `Wedding_dress_Sapon_Anna_1-2.jpg`, `Wedding_dress_Sapon_Anna_2-1.jpg`, `Wedding_dress_Sapon_Anna_2-2.jpg` |
| **От идеи к образу** | `Design3_sketch_real_model.jpg`, `Design4_1_sketch_real_model.jpg`, `Design5_sketch_real_model.jpg`, `Design6_sketch_real_model.jpg` |
| **Fashion Show** | `Sapon_collection_model1_on_Fashion_show.jpeg` — `model5` |
| **Галерея** | Все файлы из `Fashion_models_Sapon_Anna/` |
| **Footer** | `Logo_Sapon_Anna_use.jpg` (фото вывески ателье) |

---

## 3. СТРУКТУРА САЙТА

### 3.0 HEADER (Шапка)

**Поведение:**
- Прозрачный фон при загрузке
- Solid #2D2D2D при скролле (transition 0.3s)
- Фиксированный (sticky)

**Элементы:**
```
[Logo]                    [Навигация]                         [CTA]
Anna Sapon          Коллекции  Ателье  О дизайнере  Контакты    [Записаться]
(script logo)       (uppercase, letter-spacing: 2px)           (gold button)
```

**Изображение:** `Logo_Sapon_Anna_main.jpg`

---

### 3.1 HERO (Главный экран)

**Компоновка:** Full-viewport, изображение справа, текст слева

**Изображение:** `Fashion_model_4-1.jpg` (или видео-фон с тканями)

**Контент:**
```
ANNA SAPON
───────────

Искусство индивидуального
пошива в Москве

[Записаться на консультацию]

↓
```

**Микрокопия:**
- Заголовок: `Искусство индивидуального пошива в Москве`
- Подзаголовок (опционально): `Вечерние и свадебные платья, созданные для вас`
- CTA: `Записаться на консультацию`

---

### 3.2 ПРОЦЕСС (Наш подход)

**Компоновка:** 4 колонки с иконками на светлом фоне (#F7F6F4)

**Заголовок секции:** `Путь к идеальному платью`

**Шаги:**

| Иконка | Название | Описание |
|--------|----------|----------|
| 01 | Консультация | Знакомство, обсуждение образа и пожеланий |
| 02 | Эскиз | Разработка уникального дизайна |
| 03 | Пошив | Работа с тканями и деталями |
| 04 | Примерка | Финальная подгонка по фигуре |

**Изображения для фона/акцентов:**
- `Sapon_process_sketches_3_items.jpg`
- `Design2_process2_1sketch.jpg`

---

### 3.3 КОЛЛЕКЦИИ

**Компоновка:** Горизонтальный scroll или 2 крупных блока

**Заголовок секции:** `Коллекции`

**Категории:**

#### Вечерние платья
- Превью: `Fashion_model_2-1.jpg`
- Текст: `Вечерние`
- Hover: zoom 1.05, overlay с кнопкой "Смотреть"

#### Свадебные платья
- Превью: `Wedding_dress_Sapon_Anna_1-1.jpg`
- Текст: `Свадебные`
- Hover: zoom 1.05, overlay с кнопкой "Смотреть"

**CTA под секцией:** `Все работы →`

---

### 3.4 О ДИЗАЙНЕРЕ (Анна Сапон)

**Компоновка:** Split-screen (изображение слева 50%, текст справа 50%)

**Изображение:** `Hero_Anna_Sapon_portrait.jpg`

**Контент:**
```
                              АННА САПОН
                              ──────────

                              Дизайнер, основатель ателье

                              Более 15 лет я создаю платья, которые
                              подчёркивают индивидуальность каждой
                              женщины. Каждый силуэт — это история,
                              рассказанная через ткань, крой и детали.

                              [Подробнее о философии]
```

**Микрокопия:**
- Заголовок: `Анна Сапон`
- Подзаголовок: `Дизайнер, основатель ателье`
- CTA: `Подробнее о философии`

---

### 3.5 ОТ ИДЕИ К ОБРАЗУ

**Компоновка:** Горизонтальная лента с парами "эскиз → готовое платье"

**Заголовок секции:** `От идеи к образу`

**Подзаголовок:** `Каждое платье начинается с эскиза`

**Изображения (пары):**
1. `Design3_sketch_real_model.jpg`
2. `Design4_1_sketch_real_model.jpg`
3. `Design5_sketch_real_model.jpg`
4. `Design6_sketch_real_model.jpg`
5. `Design7_sketch.jpg` + `Design7_real_model.jpg`

**Интеракция:** Horizontal scroll или carousel

---

### 3.6 ПОКАЗЫ (Fashion Show)

**Компоновка:** Full-width видео или слайдер изображений

**Заголовок секции:** `На подиуме`

**Изображения:**
- `Sapon_collection_model1_on_Fashion_show.jpeg`
- `Sapon_collection_model2_on_Fashion_show.jpeg`
- `Sapon_collection_model3_on_Fashion_show.jpeg`
- `Sapon_collection_model4_on_Fashion_show.jpeg`
- `Sapon_collection_model5_on_Fashion_show.jpeg`

**Интеракция:** Autoplay carousel, pause on hover

---

### 3.7 ГАЛЕРЕЯ

**Компоновка:** Masonry grid (Pinterest-style)

**Заголовок секции:** `Галерея`

**Изображения:** Все файлы из папки `Fashion_models_Sapon_Anna/`

**Интеракция:**
- Lightbox при клике
- Filter по категориям (опционально)
- Lazy loading

---

### 3.8 ОТЗЫВЫ

**Компоновка:** Горизонтальный slider, 3 отзыва видимы

**Заголовок секции:** `Истории клиентов`

**Формат отзыва:**
```
    «Анна создала платье моей мечты. Каждая
     деталь продумана до совершенства.»

     — Елена М., свадебное платье
```

**Стилистика:**
- Крупные кавычки (") цвета #C9A962
- Курсивный текст отзыва
- Имя клиента — обычный шрифт

---

### 3.9 КОНТАКТЫ

**Компоновка:** Split-screen (форма слева, информация справа)

**Заголовок секции:** `Запишитесь на консультацию`

**Форма:**
```
Имя                 [________________]
Телефон             [________________]
Интересует          [Вечернее платье ▾]
Сообщение           [________________]
                    [________________]

                    [Отправить заявку]
```

**Контактная информация:**
```
АТЕЛЬЕ ANNA SAPON

Адрес
Москва, [улица]

Телефон
+7 (XXX) XXX-XX-XX

Часы работы
Пн–Сб: 10:00–20:00
По предварительной записи

[Instagram]  [Telegram]  [WhatsApp]
```

---

### 3.10 FOOTER

**Компоновка:** Тёмный фон (#2D2D2D), минималистичный

**Изображение:** `Logo_Sapon_Anna_use.jpg` (опционально, как декор)

**Контент:**
```
─────────────────────────────────────────────────────────

Anna Sapon                     Навигация          Связаться
(script logo, white)           Коллекции          Instagram
                               Ателье             Telegram
© 2024 Anna Sapon              О дизайнере        WhatsApp
Все права защищены             Контакты

─────────────────────────────────────────────────────────
```

---

## 4. СТИЛЕВОЙ ГАЙД

### Цветовая палитра

| Название | HEX | Использование |
|----------|-----|---------------|
| Антрацит | `#2D2D2D` | Header, footer, текст заголовков |
| Шампань | `#C9A962` | CTA кнопки, акценты, hover states |
| Слоновая кость | `#F7F6F4` | Фон секций |
| Светло-серый | `#EAEAEA` | Разделители, фон карточек |
| Угольный | `#1A1A1A` | Основной текст |
| Белый | `#FFFFFF` | Фон, текст на тёмном |

### Типографика

| Элемент | Шрифт | Размер | Стиль |
|---------|-------|--------|-------|
| H1 (Hero) | Cormorant Garamond | 56-72px | Regular, line-height: 1.1 |
| H2 (Секции) | Cormorant Garamond | 36-48px | Regular |
| H3 (Подзаголовки) | Montserrat | 18-24px | Medium, uppercase, tracking: 3px |
| Body | Montserrat | 16px | Light, line-height: 1.7 |
| Navigation | Montserrat | 13px | Medium, uppercase, tracking: 2px |
| CTA Button | Montserrat | 14px | Medium, uppercase, tracking: 1px |
| Logo | Рукописный (из файла) | — | — |

### Кнопки

**Primary (CTA):**
```css
background: #C9A962;
color: #FFFFFF;
padding: 16px 32px;
border: none;
font-size: 14px;
letter-spacing: 1px;
text-transform: uppercase;
transition: all 0.3s ease;

&:hover {
  background: #B8993F;
  transform: translateY(-2px);
}
```

**Secondary (Ghost):**
```css
background: transparent;
color: #2D2D2D;
padding: 16px 32px;
border: 1px solid #2D2D2D;
```

### Отступы и сетка

- **Контейнер**: max-width 1400px, padding 0 60px
- **Секции**: padding 100px 0 (desktop), 60px 0 (mobile)
- **Между элементами**: 24-40px
- **Grid**: 12 колонок, gap 30px

---

## 5. UX И ИНТЕРАКЦИИ

### Scroll Behavior
- Smooth scroll для якорных ссылок
- Parallax эффект на hero изображении (subtle, 0.3 ratio)
- Fade-in анимация секций при scroll (IntersectionObserver)

### Header
- Прозрачный → solid transition при scroll > 50px
- Logo и nav меняют цвет соответственно

### Hover States
- Изображения в галерее: scale 1.03, cursor pointer
- Ссылки навигации: underline animation (left to right)
- CTA кнопки: lift effect (translateY -2px) + shadow

### Transitions
- Все переходы: 0.3s ease или 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Page transitions: fade 0.5s

### Mobile Adaptations
- Burger menu с full-screen overlay
- Hero text: 36px, centered
- Галерея: 2 колонки
- Секции: stack вертикально
- Touch-friendly targets: min 44px

### Микроанимации
- Logo subtle pulse on load
- Scroll indicator (стрелка вниз): bounce animation
- Form inputs: border-color transition on focus
- Success state: checkmark animation

---

## 6. ПОЛНЫЙ СПИСОК ИЗОБРАЖЕНИЙ С НАЗНАЧЕНИЕМ

### Логотипы
- `Logo_Sapon_Anna_main.jpg` — Header, основной логотип
- `Logo_Sapon_Anna_use.jpg` — Footer декор, страница контактов

### Hero / About
- `Hero_Anna_Sapon_portrait.jpg` — Секция "О дизайнере"
- `Fashion_model_4-1.jpg` — Hero background (рекомендация)

### Процесс создания
- `Sapon_process_sketches_3_items.jpg` — Секция процесса
- `Design1_process1.jpg` — Дополнительно
- `Design2_process2_1sketch.jpg` — Этап "Эскиз"
- `Design2_process2_materials.jpg` — Этап "Ткани"
- `Design2_process2_model_view1.jpg` — Этап "Готовый образ"
- `Design2_process2_model_view2.jpg` — Галерея
- `Design2_process2_model_view3.jpg` — Галерея

### От идеи к образу (sketch vs final)
- `Design3_sketch_real_model.jpg`
- `Design4_1_sketch_real_model.jpg`
- `Design4_2_sketch_real_model.jpg`
- `Design5_sketch_real_model.jpg`
- `Design6_sketch_real_model.jpg`
- `Design7_sketch.jpg` + `Design7_real_model.jpg`

### Коллекции — Вечерние
- `Fashion_model_1.jpg` — `Fashion_model_1-5.jpg`
- `Fashion_model_2-1.jpg` — `Fashion_model_2-3.jpg`
- `Fashion_model_3-1.jpg` — `Fashion_model_3-3.jpg`
- `Fashion_model_4-1.jpg` — `Fashion_model_4-7.jpg`
- `Fashion_model_5-1.jpg` — `Fashion_model_5-5.jpg`
- `Fashion_model_6-1.jpg` — `Fashion_model_6-4.jpg`
- `Fashion_model_7-1.jpg` — `Fashion_model_7-2.jpg`
- `Fashion_model_8-1.jpg` — `Fashion_model_8-2.jpg`
- `Fashion_model_9-1.jpg` — `Fashion_model_9-2.jpg`
- `Fashion_model_10-1.jpg`
- `Fashion_model_11-1.jpg`

### Коллекции — Свадебные
- `Wedding_dress_Sapon_Anna_1-1.jpg`
- `Wedding_dress_Sapon_Anna_1-2.jpg`
- `Wedding_dress_Sapon_Anna_2-1.jpg`
- `Wedding_dress_Sapon_Anna_2-2.jpg`

### Fashion Show
- `Sapon_collection_model1_on_Fashion_show.jpeg`
- `Sapon_collection_model2_on_Fashion_show.jpeg`
- `Sapon_collection_model3_on_Fashion_show.jpeg`
- `Sapon_collection_model4_on_Fashion_show.jpeg`
- `Sapon_collection_model5_on_Fashion_show.jpeg`

---

## 7. НАВИГАЦИОННАЯ КАРТА

```
ГЛАВНАЯ
├── Hero
├── Процесс
├── Коллекции (preview)
├── О дизайнере (preview)
├── От идеи к образу
├── Fashion Show
├── Галерея (preview)
├── Отзывы
└── Контакты

КОЛЛЕКЦИИ
├── Вечерние платья (grid)
└── Свадебные платья (grid)

АТЕЛЬЕ
├── Философия
├── Процесс работы
└── От идеи к образу (полная версия)

О ДИЗАЙНЕРЕ
├── История Анны
├── Достижения
└── Пресса

КОНТАКТЫ
├── Форма записи
├── Карта
└── Социальные сети
```

---

## 8. SEO МЕТА-ДАННЫЕ

**Title:** `Anna Sapon | Ателье индивидуального пошива в Москве`

**Description:** `Вечерние и свадебные платья от дизайнера Анны Сапон. Индивидуальный пошив, уникальный дизайн, безупречный крой. Запишитесь на консультацию.`

**Keywords:** `ателье москва, индивидуальный пошив, вечерние платья на заказ, свадебные платья москва, дизайнер одежды, Anna Sapon, Анна Сапон`

---

*Документ подготовлен для разработки премиального сайта ателье Anna Sapon*
*Версия 2.0 | Декабрь 2024*
