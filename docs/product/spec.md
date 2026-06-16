# Техническое задание

# Engram — система превращения контента в живую базу знаний с графом и SRS

## 1. Общая информация о проекте

### 1.1. Название проекта

**Engram**

Название взято из нейробиологии: engram — это след памяти, физическое представление воспоминания в мозге. Название хорошо отражает суть проекта: система помогает превращать потребляемый контент в устойчивую структуру знаний и памяти.

---

## 2. Краткое описание проекта

**Engram** — это web-приложение, которое позволяет пользователю добавлять источники знаний: YouTube-видео, статьи, Wikipedia-страницы, документацию или обычный текст. Система обрабатывает источник, извлекает из него отдельные единицы знания — **knowledge atoms**, связывает их между собой в граф, находит похожие и повторяющиеся атомы, а затем превращает важные атомы в карточки для интервального повторения через SRS/FSRS.

Engram не является обычным приложением для заметок. Пользователь не пишет конспекты вручную и не создаёт карточки сам. Основная ценность системы — в автоматической трансформации сырого контента в структурированные знания.

Главная формула проекта:

```text
Источник
→ обработка текста
→ извлечение атомов знания
→ поиск дублей и связей
→ граф знаний
→ карточки для повторения
→ аналитика памяти
```

---

## 3. Главная идея проекта

Пользователь часто потребляет полезный контент: смотрит видео, читает статьи, изучает документацию, разбирает книги или технические темы. Обычно после этого знания быстро теряются: ссылка забывается, заметки остаются неструктурированными, а важные мысли не повторяются.

Engram решает эту проблему:

1. Пользователь добавляет источник.
    
2. Система извлекает из источника конкретные знания.
    
3. Эти знания становятся атомами.
    
4. Атомы связываются между собой.
    
5. Повторяющиеся атомы объединяются.
    
6. Каждый атом может стать карточкой для повторения.
    
7. Граф знаний показывает не только структуру тем, но и то, насколько хорошо пользователь помнит каждую часть.
    

---

## 4. Проблема, которую решает проект

### 4.1. Проблема пользователя

Пользователь может:

- посмотреть полезное видео и забыть его через неделю;
    
- прочитать статью, но не сохранить главные мысли;
    
- создать заметку в Obsidian, но потом не вернуться к ней;
    
- накопить десятки ссылок без структуры;
    
- создать карточки в Anki вручную, но быстро устать;
    
- не понимать, какие темы он реально помнит, а какие только “когда-то смотрел”.
    

### 4.2. Почему обычные решения недостаточны

#### Obsidian

Obsidian хорошо хранит заметки и связи между ними, но пользователь сам должен писать и структурировать заметки. Граф в Obsidian чаще показывает связи между файлами, а не между отдельными мыслями.

#### Anki

Anki хорошо помогает повторять знания, но карточки нужно создавать вручную. Также карточки в Anki изолированы и не образуют полноценный граф смысловых связей.

#### AI-summary

Обычный AI-summary просто пересказывает источник короче. Он не превращает материал в структуру знаний, не строит граф, не отслеживает повторения и не помогает удерживать знания в памяти.

#### Notion / обычные заметки

Такие инструменты в основном хранят данные. Они не понимают, какие мысли повторяются, что связано между собой и что пользователь начинает забывать.

---

## 5. Цель проекта

Создать fullstack-приложение, которое демонстрирует сложную инженерную систему:

- обработка внешних источников;
    
- pipeline трансформации контента;
    
- извлечение структурированных knowledge atoms;
    
- семантический поиск похожих атомов;
    
- граф знаний;
    
- SRS/FSRS-движок повторения;
    
- аналитика состояния памяти;
    
- экспорт знаний в Markdown / Obsidian.
    

---

## 6. Основная пользовательская ценность

Пользователь получает систему, которая отвечает на вопросы:

- Что полезного было в этом видео или статье?
    
- Какие конкретные мысли стоит запомнить?
    
- Что я уже знаю по этой теме?
    
- Какие знания повторяются в разных источниках?
    
- Какие темы связаны между собой?
    
- Что я хорошо помню?
    
- Что я начинаю забывать?
    
- Что нужно повторить сегодня?
    

---

## 7. Целевая аудитория

### 7.1. Основная аудитория

- студенты;
    
- программисты;
    
- люди, изучающие новые технологии;
    
- пользователи Obsidian;
    
- пользователи Anki;
    
- люди, которые часто смотрят образовательные YouTube-видео;
    
- люди, которые читают статьи, документацию и книги;
    
- люди, которые хотят строить личную базу знаний.
    

### 7.2. Потенциальные сценарии использования

- изучение программирования;
    
- подготовка к экзаменам;
    
- изучение технических тем;
    
- разбор книг;
    
- изучение языков;
    
- подготовка к собеседованиям;
    
- структурирование знаний из видео и статей;
    
- создание личного knowledge graph.
    

---

## 8. Ключевая концепция: Knowledge Atom

### 8.1. Что такое knowledge atom

**Knowledge Atom** — это маленькая, самостоятельная единица знания, извлечённая из источника.

Атом должен быть:

- коротким;
    
- понятным;
    
- самостоятельным;
    
- связанным с источником;
    
- пригодным для повторения;
    
- пригодным для отображения в графе.
    

### 8.2. Примеры атомов

#### Пример по Redis

```text
Redis хранит данные в оперативной памяти, поэтому обычно быстрее дисковых баз данных.
```

#### Пример по литературе

```text
Раскольников совершает преступление не только ради денег, но и чтобы проверить свою теорию о праве сильной личности.
```

#### Пример по покупке автомобиля

```text
Перед покупкой подержанного автомобиля нужно проверить VIN, историю ДТП, количество владельцев и юридические ограничения.
```

### 8.3. Типы атомов

В MVP необходимо поддержать следующие типы:

| Тип атома      | Описание                                    |
| -------------- | ------------------------------------------- |
| **Definition** | определение понятия                         |
| **Claim**      | утверждение или тезис                       |
| **Technique**  | практический метод или инструкция           |
| **Warning**    | предупреждение, риск, ошибка                |
| **Example**    | пример использования                        |
| **Question**   | вопрос, который стоит изучить или повторить |

### 8.4. Почему atom лучше обычной заметки

Обычная заметка — это произвольный текст. Система не всегда понимает, что внутри неё важно.

Атом — это структурированная единица, у которой есть:

- тип;
    
- источник;
    
- темы;
    
- связи;
    
- embedding;
    
- статус повторения;
    
- история review;
    
- вероятность запоминания;
    
- место в графе.
    

---

## 9. Главный принцип архитектуры

Engram не должен строиться как обычное приложение заметок.

Неправильная архитектура:

```text
Source
Note
AI Summary
Folder
```

Правильная архитектура:

```text
Content-to-Knowledge Pipeline
  → Sources
  → Fragments
  → Knowledge Atoms
  → Relations
  → Review States
  → Graph
```

В проекте первична не сущность “заметка”, а процесс трансформации контента в структуру знаний.

---

## 10. Основной пользовательский сценарий

### 10.1. Шаг 1. Добавление источника

Пользователь добавляет:

- ссылку на YouTube-видео;
    
- ссылку на Wikipedia-статью;
    
- ссылку на обычную статью;
    
- вручную вставленный текст;
    
- текстовый конспект.
    

В MVP приоритет:

1. Вставка текста вручную.
    
2. Wikipedia URL.
    
3. Web article URL.
    
4. YouTube URL / transcript.
    

### 10.2. Шаг 2. Обработка источника

Система запускает processing pipeline:

```text
Source submitted
→ text extraction
→ cleaning
→ chunking
→ atom extraction
→ atom classification
→ embedding generation
→ duplicate detection
→ graph linking
→ SRS state creation
```

Пользователь должен видеть статус обработки, чтобы система не выглядела как чёрный ящик.

### 10.3. Шаг 3. Просмотр найденных атомов

После обработки источник попадает в экран **Atom Inbox**.

Пользователь видит:

- список найденных атомов;
    
- тип каждого атома;
    
- confidence;
    
- источник;
    
- похожие атомы;
    
- предложенные связи.
    

Пользователь может:

- принять атом;
    
- удалить атом;
    
- отредактировать атом;
    
- объединить с похожим;
    
- отправить в SRS;
    
- открыть источник.
в блокноте
    

### 10.4. Шаг 4. Добавление в граф

После подтверждения атомы появляются в графе знаний.

Граф показывает:

- темы;
    
- смысловые связи;
    
- похожие атомы;
    
- источники;
    
- состояние памяти пользователя.
    

### 10.5. Шаг 5. Повторение

Каждый атом получает SRS-состояние.

В разделе Review пользователь проходит карточки:

1. Видит вопрос.
    
2. Пытается вспомнить ответ.
    
3. Нажимает “Показать ответ”.
    
4. Оценивает себя: Again / Hard / Good / Easy.
    
5. Система пересчитывает дату следующего повторения.
    

### 10.6. Шаг 6. Обновление графа

После review:

- атом меняет цвет;
    
- обновляется retention probability;
    
- обновляется next review date;
    
- меняется аналитика по теме.
    

---

## 11. Примеры работы системы

## 11.1. Пример 1: видео про выбор машины в 2026 году

Пользователь добавляет источник:

```text
YouTube: Как выбрать машину в 2026 году: где искать, как проверять, как торговаться
```

Система извлекает атомы:

### Atom 1

```text
Тип: Technique
Текст: Перед покупкой машины нужно проверить VIN-номер, историю ДТП, количество владельцев и юридические ограничения.
```

### Atom 2

```text
Тип: Warning
Текст: Слишком низкая цена автомобиля относительно рынка может указывать на скрытые проблемы.
```

### Atom 3

```text
Тип: Technique
Текст: При торге эффективнее ссылаться на конкретные найденные проблемы, а не просто просить скидку.
```

### Atom 4

```text
Тип: Definition
Текст: Юридическая чистота автомобиля означает отсутствие залогов, арестов, ограничений регистрации и проблем с правом собственности.
```

В графе появляется кластер:

```text
Покупка авто
  ├── Проверка истории
  ├── VIN
  ├── Юридическая чистота
  ├── Торг
  └── Рыночная цена
```

Карточки для повторения:

```text
Вопрос: Что нужно проверить перед покупкой подержанной машины?
Ответ: VIN, историю ДТП, владельцев, юридические ограничения и документы.

Вопрос: Почему слишком низкая цена может быть опасной?
Ответ: Она может указывать на скрытые дефекты, юридические проблемы или срочную продажу с рисками.
```

---

## 11.2. Пример 2: разбор “Преступления и наказания”

Пользователь добавляет текст или видеоразбор.

Система извлекает атомы:

### Atom 1

```text
Тип: Definition
Текст: Теория Раскольникова делит людей на “обыкновенных” и “необыкновенных”, которым якобы позволено нарушать моральные нормы ради высшей цели.
```

### Atom 2

```text
Тип: Claim
Текст: Раскольников совершает убийство не только ради денег, но и чтобы проверить собственную теорию.
```

### Atom 3

```text
Тип: Claim
Текст: Соня является нравственным противовесом Раскольникову, потому что её вера и сострадание противопоставлены его рациональной жестокости.
```

### Atom 4

```text
Тип: Claim
Текст: После преступления Раскольников получает не свободу, а внутренний распад, страх и отчуждение.
```

В графе появляется кластер:

```text
Преступление и наказание
  ├── Раскольников
  ├── Теория
  ├── Преступление
  ├── Вина
  ├── Соня
  ├── Покаяние
  └── Нравственный закон
```

Карточки для повторения:

```text
Вопрос: В чём суть теории Раскольникова?
Ответ: Он делит людей на обыкновенных и необыкновенных, считая, что вторым позволено переступать моральные нормы ради великой цели.

Вопрос: Почему Соня важна для понимания романа?
Ответ: Она противопоставлена Раскольникову как образ веры, сострадания и нравственного пути.
```

---

## 11.3. Пример 3: статья “Как работает Redis”

Пользователь добавляет статью или видео про Redis.

Система извлекает атомы:

### Atom 1

```text
Тип: Definition
Текст: Redis — это in-memory key-value хранилище данных, которое часто используют для кэша, сессий, очередей и счётчиков.
```

### Atom 2

```text
Тип: Claim
Текст: Redis работает быстро, потому что хранит данные в оперативной памяти, а не на диске.
```

### Atom 3

```text
Тип: Technique
Текст: Cache-aside паттерн предполагает, что приложение сначала проверяет данные в Redis, а при промахе читает их из основной базы и сохраняет в кэш.
```

### Atom 4

```text
Тип: Warning
Текст: Redis не стоит использовать как замену основной базы данных без понимания persistence, eviction policy и риска потери данных.
```

### Atom 5

```text
Тип: Definition
Текст: TTL в Redis задаёт время жизни ключа, после которого ключ автоматически удаляется.
```

В графе появляется кластер:

```text
Redis
  ├── In-memory storage
  ├── Cache
  ├── Cache-aside
  ├── TTL
  ├── Persistence
  ├── Eviction policy
  └── Rate limiting
```

Карточки:

```text
Вопрос: Почему Redis быстрый?
Ответ: Потому что хранит данные в оперативной памяти.

Вопрос: Что такое TTL в Redis?
Ответ: Время жизни ключа, после которого он автоматически удаляется.

Вопрос: Что такое cache-aside?
Ответ: Паттерн, где приложение сначала проверяет кэш, а при промахе читает данные из основной базы и сохраняет результат в кэш.
```

---

# 12. Функциональные требования

## 12.1. Авторизация и пользователь

В MVP можно реализовать простую single-user модель или полноценную регистрацию.

Минимальный вариант:

- регистрация;
    
- вход;
    
- JWT / cookie-based auth;
    
- личная база источников;
    
- личный граф;
    
- личные review-сессии.
    

Роли в MVP:

```text
User
Admin optional
```

Командный режим в MVP не требуется.

---

## 12.2. Sources / Источники

### 12.2.1. Типы источников

MVP должен поддерживать:

|Тип источника|Приоритет|
|---|---|
|Manual Text|обязательный|
|Wikipedia URL|обязательный|
|Web Article URL|желательно|
|YouTube URL / transcript|желательно, но осторожно|
|PDF|не входит в MVP|
|Browser Extension Capture|не входит в MVP|

### 12.2.2. Поля источника

```text
id
userId
type
url
title
rawText
cleanedText
status
errorMessage
createdAt
processedAt
```

### 12.2.3. Статусы источника

```text
Draft
Submitted
Processing
Processed
Failed
PartiallyProcessed
```

### 12.2.4. Действия пользователя

Пользователь может:

- добавить источник;
    
- открыть источник;
    
- удалить источник;
    
- повторно запустить обработку;
    
- посмотреть атомы источника;
    
- посмотреть ошибку обработки;
    
- экспортировать результаты.
    

---

## 12.3. Processing Pipeline / Обработка

### 12.3.1. Назначение

Pipeline — центральная часть проекта. Он превращает сырой источник в knowledge atoms.

### 12.3.2. Этапы pipeline

```text
1. Source ingestion
2. Text extraction
3. Text cleaning
4. Semantic chunking
5. Atom extraction
6. Atom classification
7. Embedding generation
8. Duplicate search
9. Relation generation
10. SRS state initialization
```

### 12.3.3. Статусы шага pipeline

Каждый шаг должен иметь статус:

```text
Pending
Running
Completed
Failed
Skipped
```

### 12.3.4. Требования к UI обработки

Пользователь должен видеть:

- текущий статус источника;
    
- какие этапы завершены;
    
- где произошла ошибка;
    
- сколько атомов извлечено;
    
- сколько найдено потенциальных дублей;
    
- сколько связей создано.
    

---

## 12.4. Atom Extraction / Извлечение атомов

### 12.4.1. Назначение

Система должна извлекать из текста не summary, а отдельные атомы знания.

### 12.4.2. Требования к atom extraction

Каждый atom должен содержать:

```text
type
text
shortTitle
topics
sourceFragment
confidence
```

### 12.4.3. Требования к качеству атома

Атом должен быть:

- понятным без чтения всего источника;
    
- достаточно коротким;
    
- не слишком общим;
    
- не дублирующим соседний атом;
    
- пригодным для карточки;
    
- связанным с конкретным источником.
    

### 12.4.4. Примеры плохих атомов

```text
Redis очень полезен.
```

Слишком общее.

```text
В видео автор рассказывает про машины.
```

Это не знание.

```text
Нужно быть осторожным.
```

Непонятно, в каком контексте.

### 12.4.5. Примеры хороших атомов

```text
Redis хранит данные в оперативной памяти, поэтому операции чтения и записи обычно быстрее, чем у дисковых баз данных.
```

```text
При покупке подержанного автомобиля VIN-номер помогает проверить историю ДТП, владельцев и юридические ограничения.
```

---

## 12.5. Atom Inbox / Входящие атомы

### 12.5.1. Назначение

Atom Inbox — экран проверки новых атомов после обработки источника.

### 12.5.2. Пользователь должен видеть

- текст атома;
    
- тип атома;
    
- источник;
    
- confidence;
    
- похожие атомы;
    
- предложенные темы;
    
- статус review;
    
- статус принятия.
    

### 12.5.3. Действия пользователя

Пользователь может:

- принять атом;
    
- удалить атом;
    
- отредактировать текст;
    
- изменить тип;
    
- добавить тему;
    
- объединить с похожим атомом;
    
- оставить отдельным;
    
- открыть источник.
    

### 12.5.4. Статусы атома в inbox

```text
PendingReview
Accepted
Rejected
Merged
NeedsEdit
```

---

## 12.6. Semantic Deduplication / Поиск похожих атомов

### 12.6.1. Назначение

Система должна предотвращать захламление базы одинаковыми знаниями.

Если два источника говорят одно и то же, система не должна создавать много одинаковых атомов. Она должна предложить объединение.

### 12.6.2. Как работает deduplication

1. Для нового атома создаётся embedding.
    
2. Система ищет похожие атомы через векторный поиск.
    
3. Если similarity выше порога, создаётся duplicate candidate.
    
4. Пользователь решает: merge или keep separate.
    

### 12.6.3. MVP-поведение

В MVP не делать автоматический merge.

Правильное поведение:

```text
similarity >= 0.88
→ показать duplicate suggestion
→ пользователь выбирает Merge / Keep separate
```

### 12.6.4. При merge

Система должна:

- оставить один основной атом;
    
- добавить новый источник к списку источников атома;
    
- сохранить связь с новым фрагментом;
    
- обновить confidence;
    
- не потерять review history;
    
- не создать дубликат в графе.
    

### 12.6.5. Пример

Existing atom:

```text
TTL в Redis задаёт время жизни ключа, после которого ключ автоматически удаляется.
```

New atom:

```text
Redis key can expire automatically after a configured TTL.
```

Similarity:

```text
0.91
```

UI:

```text
Возможный дубль найден.
[Merge] [Keep separate]
```

---

## 12.7. Knowledge Graph / Граф знаний

### 12.7.1. Назначение

Граф знаний показывает структуру атомов и связей между ними.

### 12.7.2. Узлы графа

Узел графа = Knowledge Atom.

Узел должен отображать:

- короткое название;
    
- тип атома;
    
- цвет по состоянию памяти;
    
- размер по важности / числу источников;
    
- иконку типа.
    

### 12.7.3. Цвет узла

Цвет должен показывать retention state:

|Цвет|Значение|
|---|---|
|Серый|атом новый, ещё не повторялся|
|Зелёный|пользователь хорошо помнит|
|Жёлтый|скоро нужно повторить|
|Красный|пользователь плохо помнит / давно не повторял|
|Синий / фиолетовый|можно использовать для выделения выбранных типов|

### 12.7.4. Рёбра графа

Ребро = связь между атомами.

Типы связей в MVP:

```text
similar_to
related_to
explains
duplicate_candidate
```

В MVP не требуется полноценная contradiction detection.

### 12.7.5. Взаимодействие с графом

Пользователь должен уметь:

- приблизить/отдалить граф;
    
- двигать граф;
    
- кликнуть на атом;
    
- открыть карточку атома;
    
- фильтровать по теме;
    
- фильтровать по типу;
    
- фильтровать по источнику;
    
- фильтровать по retention status;
    
- подсвечивать соседей выбранного атома.
    

### 12.7.6. Atom Details Panel

При клике на атом открывается боковая панель:

```text
title
type
full text
sources
related atoms
review state
next review date
retention probability
actions
```

Действия:

```text
Review now
Edit
Open source
Merge duplicate
Export
Delete
```

---

## 12.8. SRS / Review Engine

### 12.8.1. Назначение

SRS помогает пользователю не забывать атомы.

Каждый Knowledge Atom может иметь review state.

### 12.8.2. Состояния карточки

```text
New
Learning
Review
Relearning
Suspended
```

### 12.8.3. Оценки пользователя

После просмотра ответа пользователь выбирает:

```text
Again
Hard
Good
Easy
```

### 12.8.4. Что система должна пересчитывать

После review система обновляет:

```text
lastReviewedAt
nextReviewAt
reviewCount
lapses
stability
difficulty
retrievability
retentionProbability
```

### 12.8.5. Review Session

Экран review должен содержать:

- количество карточек на сегодня;
    
- вопрос;
    
- кнопку “Показать ответ”;
    
- ответ;
    
- источник;
    
- кнопки оценки;
    
- прогресс сессии;
    
- итог после завершения.
    

### 12.8.6. Автоматическая генерация карточек

Карточка создаётся на основе atom type.

#### Definition

```text
Question: Что такое [concept]?
Answer: [atom text]
```

#### Technique

```text
Question: Как применяется [technique]?
Answer: [atom text]
```

#### Warning

```text
Question: Какой риск связан с [topic]?
Answer: [atom text]
```

#### Claim

```text
Question: Какой тезис связан с [topic]?
Answer: [atom text]
```

### 12.8.7. Ручное редактирование карточки

Пользователь должен иметь возможность отредактировать:

- вопрос;
    
- ответ;
    
- подсказку;
    
- источник;
    
- статус активности карточки.
    

---

## 12.9. Analytics / Аналитика

### 12.9.1. Назначение

Аналитика показывает состояние базы знаний и памяти пользователя.

### 12.9.2. MVP-метрики

- количество источников;
    
- количество атомов;
    
- количество атомов по типам;
    
- количество атомов по темам;
    
- количество карточек на сегодня;
    
- retention percentage;
    
- review streak;
    
- heatmap активности;
    
- самые слабые темы;
    
- самые большие кластеры графа;
    
- динамика добавления знаний.
    

### 12.9.3. Экран аналитики должен показывать

```text
Total atoms
Accepted atoms
Merged duplicates
Due today
Review accuracy
Weak topics
Knowledge growth chart
Review heatmap
```

---

## 12.10. Export / Экспорт в Markdown и Obsidian

### 12.10.1. Назначение

Engram должен позволять экспортировать знания в Markdown, чтобы пользователь мог использовать их в Obsidian или других системах.

### 12.10.2. В MVP

Не требуется полноценный Obsidian plugin.

Нужно реализовать:

- экспорт одного атома;
    
- экспорт темы;
    
- экспорт источника;
    
- экспорт кластера графа;
    
- генерацию `.md` файла.
    

### 12.10.3. Формат Markdown

Пример:

```md
# Redis

## Definitions

- Redis — это in-memory key-value хранилище данных.

## Techniques

- Cache-aside паттерн предполагает, что приложение сначала проверяет Redis.

## Warnings

- Redis не стоит использовать как основную БД без понимания persistence.

## Sources

- YouTube: Redis Explained
- Article: Redis Caching Guide

## Related

- [[Cache]]
- [[TTL]]
- [[Persistence]]
```

### 12.10.4. После MVP

Можно реализовать Obsidian plugin:

- синхронизация с vault;
    
- создание markdown-файлов;
    
- добавление wikilinks;
    
- панель Engram внутри Obsidian.
    

---

# 13. Экраны приложения

## 13.1. Dashboard
![[61d2ebee-fbfe-41d6-8403-f2eebc0be28d.png]]
![[ChatGPT Image 5 июн. 2026 г., 00_38_58.png]]

Главный экран.

Должен показывать:

- due today;
    
- последние источники;
    
- новые атомы в inbox;
    
- слабые темы;
    
- review streak;
    
- быстрые действия.
    

Быстрые действия:

```text
Add Source
Start Review
Open Graph
Open Inbox
```

---

## 13.2. Sources

Список источников.

![[18069042-4e93-4c11-8f4c-d5956e740d0d.png]]

Колонки:

```text
Title
Type
Status
Atoms count
Duplicates found
Created at
Processed at
Actions
```

Действия:

```text
Open
Reprocess
Delete
Export
```

---

## 13.3. Add Source

![[ChatGPT Image 4 июн. 2026 г., 23_46_41.png]]

Форма добавления источника.

Поля:

```text
Source type
URL
Text
Title optional
Tags optional
Processing mode
```

Processing mode:

```text
Fast
Detailed
```

В MVP можно оставить один режим.

---

## 13.4. Processing

Экран обработки конкретного источника.

Показывает:

```text
Text extracted
Chunks created
Atoms extracted
Embeddings generated
Duplicates checked
Relations created
Review states created
```


![[ChatGPT Image 4 июн. 2026 г., 23_48_53.png]]

---

## 13.5. Atom Inbox

Экран проверки атомов.

Фильтры:

```text
Source
Type
Status
Confidence
Has duplicate
```

Карточка атома должна показывать:

```text
Text
Type
Source
Confidence
Duplicate suggestions
Actions
```

![[ChatGPT Image 4 июн. 2026 г., 23_59_01.png]]

---

## 13.6. Knowledge Graph

Главный визуальный экран.

![[ChatGPT Image 5 июн. 2026 г., 00_12_15.png]]

Функции:

- force-directed graph;
    
- zoom/pan;
    
- click node;
    
- filter;
    
- search;
    
- highlight cluster;
    
- color by retention;
    
- size by source count.
    

---

## 13.7. Atom Page

Страница конкретного атома.

![[ChatGPT Image 5 июн. 2026 г., 00_29_20 1.png]]

Содержит:

```text
Full text
Short title
Type
Topics
Sources
Fragments
Related atoms
Review state
Review history
Duplicate history
Actions
```

---

## 13.8. Review

Экран повторения.

![[ChatGPT Image 5 июн. 2026 г., 00_31_23.png]]

Содержит:

```text
Due cards count
Question
Answer hidden
Show Answer button
Again / Hard / Good / Easy
Source reference
Progress
```

---

## 13.9. Analytics

Экран аналитики.

![[ChatGPT Image 5 июн. 2026 г., 00_33_24.png]]

Содержит:

```text
Knowledge growth
Review heatmap
Retention chart
Weak topics
Atoms by type
Sources by type
Duplicate merge stats
```

---

## 13.10. Export

Экран экспорта.

![[ChatGPT Image 5 июн. 2026 г., 00_36_07.png]]

Функции:

```text
Export source
Export topic
Export atom
Export graph cluster
Download Markdown
```

---

# 14. Основные сущности базы данных

## 14.1. User

```text
Id
Email
PasswordHash
DisplayName
CreatedAt
```

## 14.2. Source

```text
Id
UserId
Type
Url
Title
RawText
CleanedText
Status
ErrorMessage
CreatedAt
ProcessedAt
```

## 14.3. SourceFragment

```text
Id
SourceId
Text
StartPosition
EndPosition
TimestampStart
TimestampEnd
MetadataJson
```

Для YouTube можно хранить timestamp.

## 14.4. KnowledgeAtom

```text
Id
UserId
Type
Title
Text
Confidence
Status
CreatedAt
UpdatedAt
PrimarySourceId
Embedding
```

Embedding хранить через pgvector.

## 14.5. AtomSourceLink

```text
Id
AtomId
SourceId
FragmentId
Relevance
CreatedAt
```

Нужен, потому что один atom может подтверждаться несколькими источниками.

## 14.6. AtomRelation

```text
Id
FromAtomId
ToAtomId
RelationType
SimilarityScore
CreatedAt
```

## 14.7. ReviewState

```text
Id
AtomId
UserId
State
Stability
Difficulty
Retrievability
DueAt
LastReviewedAt
ReviewCount
LapseCount
IsSuspended
```

## 14.8. ReviewLog

```text
Id
AtomId
UserId
Grade
ReviewedAt
PreviousState
NewState
PreviousDueAt
NewDueAt
StabilityBefore
StabilityAfter
DifficultyBefore
DifficultyAfter
```

## 14.9. ProcessingJob

```text
Id
SourceId
Status
CurrentStep
StartedAt
FinishedAt
ErrorMessage
CreatedAtomsCount
DuplicateCandidatesCount
RelationsCreatedCount
```

## 14.10. DuplicateCandidate

```text
Id
NewAtomId
ExistingAtomId
SimilarityScore
Status
CreatedAt
ResolvedAt
```

Status:

```text
Pending
Merged
Rejected
```

---

# 15. Backend architecture

## 15.1. Общая структура backend

Рекомендуемая архитектура:

```text
Engram.Api
Engram.Application
Engram.Domain
Engram.Infrastructure
Engram.Worker
```

### Engram.Api

- controllers / endpoints;
    
- auth;
    
- request validation;
    
- response mapping.
    

### Engram.Application

- use cases;
    
- services;
    
- DTO;
    
- commands;
    
- queries.
    

### Engram.Domain

- core entities;
    
- business logic;
    
- SRS logic;
    
- atom merge logic;
    
- domain events.
    

### Engram.Infrastructure

- EF Core;
    
- PostgreSQL;
    
- pgvector;
    
- Redis;
    
- LLM providers;
    
- text extraction;
    
- external APIs.
    

### Engram.Worker

- background processing;
    
- source processing pipeline;
    
- embedding jobs;
    
- review scheduling jobs;
    
- analytics aggregation.
    

---

## 15.2. Backend modules

### Auth Module

- registration;
    
- login;
    
- refresh token optional;
    
- user context.
    

### Source Module

- add source;
    
- process source;
    
- list sources;
    
- delete source.
    

### Processing Module

- text extraction;
    
- chunking;
    
- atom extraction;
    
- embedding;
    
- dedup;
    
- graph linking.
    

### Atom Module

- atom CRUD;
    
- atom review;
    
- atom merge;
    
- atom relations;
    
- atom search.
    

### Graph Module

- graph data endpoint;
    
- filters;
    
- node details;
    
- relation management.
    

### SRS Module

- due cards;
    
- review session;
    
- grade processing;
    
- FSRS scheduler.
    

### Export Module

- markdown generation;
    
- source export;
    
- topic export;
    
- cluster export.
    

### Analytics Module

- review stats;
    
- knowledge growth;
    
- weak topics;
    
- heatmap.
    

---

# 16. API requirements

## 16.1. Sources

```http
POST /api/sources
GET /api/sources
GET /api/sources/{id}
DELETE /api/sources/{id}
POST /api/sources/{id}/process
GET /api/sources/{id}/processing-status
GET /api/sources/{id}/atoms
```

## 16.2. Atoms

```http
GET /api/atoms
GET /api/atoms/{id}
PATCH /api/atoms/{id}
DELETE /api/atoms/{id}
POST /api/atoms/{id}/accept
POST /api/atoms/{id}/reject
POST /api/atoms/{id}/merge
GET /api/atoms/{id}/relations
GET /api/atoms/{id}/sources
```

## 16.3. Graph

```http
GET /api/graph
GET /api/graph/atom/{id}
GET /api/graph/search
```

## 16.4. Review

```http
GET /api/review/due
POST /api/review/start
POST /api/review/{atomId}/grade
GET /api/review/history
GET /api/review/stats
```

## 16.5. Export

```http
POST /api/export/atom/{id}
POST /api/export/source/{id}
POST /api/export/topic
POST /api/export/cluster
```

## 16.6. Analytics

```http
GET /api/analytics/overview
GET /api/analytics/retention
GET /api/analytics/heatmap
GET /api/analytics/weak-topics
GET /api/analytics/growth
```

---

# 17. Processing pipeline details

## 17.1. Text extraction

Для MVP:

- manual text — без extraction;
    
- Wikipedia — через HTTP API / HTML parsing;
    
- web article — basic content extraction;
    
- YouTube — через transcript, если доступен, или вручную вставленный transcript.
    

YouTube не должен быть критической зависимостью MVP.

## 17.2. Text cleaning

Система должна удалять:

- лишние пробелы;
    
- повторяющиеся строки;
    
- меню сайта;
    
- timestamps, если они мешают;
    
- мусорные блоки.
    

## 17.3. Chunking

Chunking должен быть смысловым, а не просто по фиксированному количеству символов.

MVP-правила:

- делить по заголовкам;
    
- делить по абзацам;
    
- объединять слишком маленькие куски;
    
- ограничивать максимальную длину chunk;
    
- сохранять привязку к source fragment.
    

## 17.4. Atom extraction

LLM должен возвращать JSON строго по схеме:

```json
{
  "atoms": [
    {
      "type": "Definition",
      "title": "Что такое Redis",
      "text": "Redis — это in-memory key-value хранилище...",
      "topics": ["Redis", "Database", "Cache"],
      "confidence": 0.87
    }
  ]
}
```

Если JSON невалидный:

- retry;
    
- fallback;
    
- error log.
    

## 17.5. Embedding generation

Для каждого atom генерируется embedding.

Embedding нужен для:

- поиска похожих атомов;
    
- построения связей;
    
- deduplication;
    
- semantic search.
    

## 17.6. Duplicate detection

После embedding:

```text
new atom embedding
→ vector search
→ top similar atoms
→ threshold filtering
→ duplicate candidates
```

## 17.7. Relation generation

Система создаёт связи:

```text
similar_to
related_to
explains
duplicate_candidate
```

В MVP связи можно строить на основе similarity.

---

# 18. SRS / FSRS requirements

## 18.1. Что использовать

Для MVP можно реализовать FSRS-подобную модель или упрощённую FSRS-реализацию.

Важно:

- хранить stability;
    
- хранить difficulty;
    
- хранить retrievability;
    
- поддерживать 4 оценки;
    
- рассчитывать next review date.
    

Если FSRS окажется сложным, можно начать с упрощённого SRS, но в ТЗ оставить FSRS как целевую модель.

## 18.2. Review grading

Оценки:

```text
Again = не вспомнил
Hard = вспомнил с трудом
Good = вспомнил нормально
Easy = вспомнил легко
```

## 18.3. Due queue

Система должна показывать карточки:

```text
dueAt <= now
```

Также можно показывать новые атомы.

## 18.4. Retention probability

Retention probability нужна для цвета графа.

Пример:

```text
>= 0.85 green
0.6-0.85 yellow
< 0.6 red
never reviewed gray
```

---

# 19. Frontend requirements

## 19.1. Общий стиль UI

UI должен быть современным, аккуратным, визуальным.

Желательные черты:

- dashboard style;
    
- карточки;
    
- граф;
    
- чистая типографика;
    
- тёмная тема;
    
- понятные статусы;
    
- плавные переходы;
    
- без перегруженности.
    

## 19.2. Технологии

```text
React
TypeScript
React Query
Zustand / Redux Toolkit
D3.js / React Flow for graph
Recharts for analytics
Tailwind / CSS Modules
```

## 19.3. Основные компоненты

```text
SourceCard
ProcessingTimeline
AtomCard
DuplicateCandidateCard
GraphView
AtomDetailsPanel
ReviewCard
AnalyticsWidget
MarkdownExportPreview
```

---

# 20. Non-functional requirements

## 20.1. Производительность

Система должна:

- не блокировать UI во время обработки;
    
- обрабатывать источники в фоне;
    
- показывать статус обработки;
    
- кэшировать тяжёлые запросы;
    
- не перерисовывать весь граф при каждом изменении без необходимости.
    

## 20.2. Надёжность

- ошибки pipeline должны логироваться;
    
- источник может быть обработан повторно;
    
- падение одного шага не должно ломать всю систему;
    
- пользователь должен видеть понятную ошибку.
    

## 20.3. Масштабируемость MVP

MVP должен комфортно работать с:

```text
до 100 источников
до 5000 атомов
до 20000 связей
```

Этого достаточно для курсового проекта.

## 20.4. Безопасность

- пользователь видит только свои источники;
    
- private data не должна быть доступна другим;
    
- API должен проверять userId;
    
- хранить секреты через environment variables;
    
- не логировать API keys;
    
- ограничивать размер входного текста.
    

## 20.5. Privacy

Так как проект работает с личными источниками пользователя, нужно:

- дать возможность удалить источник;
    
- удалить atom;
    
- удалить всю базу пользователя;
    
- не делать автотрекинг браузера в MVP;
    
- не собирать данные без действия пользователя.
    

---

# 21. Технологический стек

## 21.1. Backend

```text
ASP.NET Core
Entity Framework Core
PostgreSQL
pgvector
Redis
Hangfire / Quartz
Docker
```

## 21.2. Frontend

```text
React
TypeScript
React Query
D3.js / React Flow
Recharts
```

## 21.3. AI / NLP

```text
OpenAI API / compatible LLM provider
Embeddings API
Optional Ollama for local development
```

## 21.4. Infrastructure

```text
Docker Compose
PostgreSQL with pgvector
Redis
Backend API
Worker service
Frontend app
```

---

# 22. Docker Compose

MVP должен запускаться через Docker Compose.

Сервисы:

```text
engram-api
engram-worker
engram-frontend
postgres
redis
```

Опционально:

```text
ollama
```

---

# 23. Что входит в MVP

## Обязательное

```text
User auth
Add source
Manual text source
Wikipedia/web source
Processing pipeline
Atom extraction
Atom inbox
Atom edit/delete/accept
Embeddings
Semantic duplicate suggestions
Merge atoms
Knowledge graph
Atom details
SRS review engine
Review session
Retention coloring
Basic analytics
Markdown export
Docker compose
```

## Желательно

```text
YouTube transcript support
Source timeline
Graph filters
Weak topics
Review heatmap
```

---

# 24. Что НЕ входит в MVP

```text
Browser extension
Full Obsidian plugin
Perfect YouTube transcript extraction
PDF parsing
Mobile app
Collaboration
AI chat with notes
Full contradiction detection
Automatic tracking of browser activity
Advanced recommendations
Multi-user shared knowledge base
```

Эти пункты можно указать в roadmap.

---

# 25. Roadmap после MVP

## Версия 1.1

- Obsidian plugin;
    
- browser extension;
    
- improved YouTube support;
    
- PDF support;
    
- better graph clustering.
    

## Версия 1.2

- contradiction candidates;
    
- source subscriptions;
    
- automatic topic maps;
    
- better SRS customization.
    

## Версия 2.0

- collaborative knowledge bases;
    
- mobile app;
    
- local-first mode;
    
- AI tutor based on atoms;
    
- full RAG chat over knowledge graph.
    

---

# 26. План разработки на 4 месяца

## Месяц 1 — Foundation + Pipeline

Цели:

- создать базовую архитектуру;
    
- реализовать источники;
    
- реализовать первую обработку текста;
    
- получить первые atoms.
    

Задачи:

```text
Backend architecture
Auth
PostgreSQL schema
Source CRUD
Manual text source
Wikipedia/web source basic
ProcessingJob
Text cleaning
Chunking
LLM atom extraction
Atom storage
Basic frontend dashboard
```

Результат месяца:

```text
Пользователь вставляет текст → система извлекает атомы → атомы видны в интерфейсе.
```

---

## Месяц 2 — SRS Engine + Review

Цели:

- сделать атомы карточками;
    
- реализовать review-сессии;
    
- начать отслеживать память.
    

Задачи:

```text
ReviewState
ReviewLog
FSRS / simplified scheduler
Due cards endpoint
Review UI
Again / Hard / Good / Easy
Retention probability
Review stats
```

Результат месяца:

```text
Пользователь может повторять атомы, а система назначает следующую дату повторения.
```

---

## Месяц 3 — Graph + Deduplication

Цели:

- сделать живой граф;
    
- реализовать поиск дублей;
    
- сделать merge.
    

Задачи:

```text
pgvector setup
Embedding generation
Similarity search
DuplicateCandidate
Merge atoms
AtomRelation
Knowledge Graph UI
Atom details panel
Graph filters
Retention coloring
```

Результат месяца:

```text
Атомы связываются в граф, похожие атомы находятся, пользователь может объединять дубли.
```

---

## Месяц 4 — Polish + Export + Demo

Цели:

- довести UX;
    
- добавить экспорт;
    
- подготовить защиту;
    
- стабилизировать проект.
    

Задачи:

```text
Markdown export
Analytics dashboard
Review heatmap
Weak topics
Better source processing
YouTube support if possible
Docker compose
Seed demo data
UI polish
Error handling
Documentation
```

Результат месяца:

```text
Проект готов к демонстрации: источник → атомы → граф → review → аналитика → экспорт.
```

---

# 27. Сценарий демонстрации на защите

## Шаг 1. Добавление источника

Пользователь вставляет текст или ссылку на статью про Redis.

## Шаг 2. Обработка

Система показывает pipeline:

```text
Text extracted
Chunks created
Atoms extracted
Embeddings generated
Duplicates checked
Graph updated
Review states created
```

## Шаг 3. Atom Inbox

Появляется список атомов:

```text
Definition: Redis is...
Technique: Cache-aside...
Warning: Redis persistence...
```

## Шаг 4. Deduplication

Добавляется второй источник про Redis.

Система показывает:

```text
Possible duplicate found
Similarity: 0.91
```

Пользователь нажимает Merge.

## Шаг 5. Graph

Открывается граф знаний.

Видно:

```text
Redis
Cache
TTL
Persistence
Rate limiting
```

## Шаг 6. Review

Пользователь проходит несколько карточек.

Одна карточка получает Easy, другая Again.

## Шаг 7. Graph updates

Граф меняет цвета:

```text
Easy → green
Again → red
```

## Шаг 8. Analytics

Показывается:

```text
Retention
Due cards
Weak topics
Knowledge growth
```

## Шаг 9. Export

Пользователь экспортирует тему Redis в Markdown.

---

# 28. Критерии успешности MVP

Проект считается успешным, если:

1. Пользователь может добавить источник.
    
2. Система может обработать текст.
    
3. Система извлекает typed knowledge atoms.
    
4. Атомы отображаются в Atom Inbox.
    
5. Пользователь может принять, удалить, отредактировать atom.
    
6. Система создаёт embeddings.
    
7. Система находит похожие атомы.
    
8. Пользователь может объединить duplicate candidates.
    
9. Атомы отображаются в графе.
    
10. При клике на атом открывается подробная карточка.
    
11. Каждый atom может быть карточкой SRS.
    
12. Пользователь может пройти review session.
    
13. После review обновляется retention.
    
14. Цвет атома в графе зависит от retention.
    
15. Есть базовая аналитика.
    
16. Есть Markdown export.
    
17. Проект запускается через Docker Compose.
    
18. Есть демо-данные для защиты.
    

---

# 29. Почему проект не CRUD

Engram не сводится к созданию, чтению, обновлению и удалению записей.

Главное ядро проекта:

```text
Content-to-Knowledge Pipeline
Semantic Deduplication
Knowledge Graph
SRS Engine
Retention Analytics
```

Система не просто хранит данные. Она:

- преобразует сырой контент;
    
- извлекает знания;
    
- классифицирует атомы;
    
- ищет похожие;
    
- объединяет источники;
    
- строит граф;
    
- планирует повторения;
    
- отслеживает состояние памяти.
    

CRUD здесь является только вспомогательным слоем.

---

# 30. Короткая формулировка для защиты

**Engram** — это система, которая автоматически превращает YouTube-видео, статьи и тексты в структурированную базу знаний. Она извлекает отдельные атомы знания, связывает их в граф, находит повторяющиеся идеи из разных источников и помогает пользователю запоминать материал через интервальное повторение.

Главная особенность проекта в том, что единица знания одновременно является:

```text
атомом в базе знаний,
узлом графа,
карточкой для повторения,
и элементом аналитики памяти.
```

Поэтому Engram показывает не только то, что пользователь сохранил, но и то, что он действительно помнит.

---

# 31. Главная инженерная ценность проекта

Проект демонстрирует:

- проектирование доменной модели;
    
- обработку данных в фоне;
    
- pipeline architecture;
    
- работу с PostgreSQL и pgvector;
    
- Redis / caching;
    
- SRS scheduling;
    
- graph visualization;
    
- semantic search;
    
- AI integration не как “чатик”, а как часть системы;
    
- fullstack-архитектуру;
    
- понятный UX;
    
- современный стек;
    
- реальную продуктовую идею.
    

---

# 32. Итоговый вывод

Engram — сильный курсовой проект, потому что он объединяет:

```text
личную пользу
AI pipeline
semantic search
knowledge graph
SRS
аналитику
визуальный интерфейс
backend-сложность
```

Проект реалистичен за 3–4 месяца, если строго ограничить MVP и не добавлять browser extension, полноценный Obsidian plugin, contradiction detection и другие крупные расширения на старте.

Главное правило разработки:

```text
Сначала сделать рабочий путь:
текст → атомы → граф → review.

Потом улучшать источники, UI и интеграции.
```