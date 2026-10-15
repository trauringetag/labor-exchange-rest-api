const bcrypt = require('bcryptjs');

module.exports = async (db) => {
    console.log('Начинаю заполнение базы данных первичными данными...');

    const [adminRole] = await db.roles.findOrCreate({
        where: { name: 'admin' },
        defaults: { name: 'admin', access_level: 10 }
    });

    const [userRole] = await db.roles.findOrCreate({
        where: { name: 'user' },
        defaults: { name: 'user', access_level: 1 }
    });

    const [moderatorRole] = await db.roles.findOrCreate({
        where: { name: 'moderator' },
        defaults: { name: 'moderator', access_level: 5 }
    });

    console.log('  Роли созданы');

    const adminPassword = await bcrypt.hash('12345678', 10);
    const userPassword = await bcrypt.hash('user1234', 10);

    await db.accounts.findOrCreate({
        where: { username: 'admin' },
        defaults: {
            username: 'admin',
            hashed_password: adminPassword,
            role_id: adminRole.id
        }
    });

    await db.accounts.findOrCreate({
        where: { username: 'user' },
        defaults: {
            username: 'user',
            hashed_password: userPassword,
            role_id: userRole.id
        }
    });

    await db.accounts.findOrCreate({
        where: { username: 'moderator' },
        defaults: {
            username: 'moderator',
            hashed_password: await bcrypt.hash('mod12345678', 10),
            role_id: moderatorRole.id
        }
    });

    console.log('  Аккаунты созданы (admin / 12345678)');

    const departments = [
        { name: 'Отдел трудоустройства', building: 'Корпус А' },
        { name: 'Отдел профориентации', building: 'Корпус А' },
        { name: 'Отдел социальных выплат', building: 'Корпус Б' },
        { name: 'Юридический отдел', building: 'Корпус Б' },
        { name: 'Отдел статистики', building: 'Корпус В' }
    ];

    for (const dept of departments) {
        await db.departments.findOrCreate({
            where: { name: dept.name },
            defaults: dept
        });
    }
    console.log('  Отделы созданы');

    const allDepts = await db.departments.findAll();
    const services = [
        { description: 'Консультация по трудоустройству', cabinet: 101, phone: '+7 (351) 123-45-01', department_id: allDepts[0].id },
        { description: 'Помощь в составлении резюме', cabinet: 102, phone: '+7 (351) 123-45-02', department_id: allDepts[0].id },
        { description: 'Профориентационное тестирование', cabinet: 201, phone: '+7 (351) 123-45-03', department_id: allDepts[1].id },
        { description: 'Оформление пособия по безработице', cabinet: 301, phone: '+7 (351) 123-45-04', department_id: allDepts[2].id },
        { description: 'Юридическая консультация', cabinet: 401, phone: '+7 (351) 123-45-05', department_id: allDepts[3].id },
        { description: 'Получение справки о статусе безработного', cabinet: 302, phone: '+7 (351) 123-45-06', department_id: allDepts[2].id },
        { description: 'Направление на переобучение', cabinet: 103, phone: '+7 (351) 123-45-07', department_id: allDepts[0].id },
        { description: 'Ярмарка вакансий', cabinet: 501, phone: '+7 (351) 123-45-08', department_id: allDepts[4].id }
    ];

    for (const svc of services) {
        await db.services.findOrCreate({
            where: { description: svc.description },
            defaults: svc
        });
    }
    console.log('  Услуги созданы');

    const workingModes = [
        { day: 'Понедельник', opening_hours: '09:00 - 18:00' },
        { day: 'Вторник', opening_hours: '09:00 - 18:00' },
        { day: 'Среда', opening_hours: '09:00 - 18:00' },
        { day: 'Четверг', opening_hours: '09:00 - 18:00' },
        { day: 'Пятница', opening_hours: '09:00 - 17:00' },
        { day: 'Суббота', opening_hours: '10:00 - 14:00' },
        { day: 'Воскресенье', opening_hours: 'Выходной' }
    ];

    for (const wm of workingModes) {
        await db.working_mode.findOrCreate({
            where: { day: wm.day },
            defaults: wm
        });
    }
    console.log('  Режим работы создан');

    const categories = [
        { name: 'Трудоустройство', description: 'Вопросы по поиску работы' },
        { name: 'Социальные выплаты', description: 'Пособия и компенсации' },
        { name: 'Профориентация', description: 'Выбор профессии и обучение' },
        { name: 'Жалоба', description: 'Жалобы на работу учреждения' },
        { name: 'Предложение', description: 'Предложения по улучшению' },
        { name: 'Документы', description: 'Справки и документы' }
    ];

    for (const cat of categories) {
        await db.categories.findOrCreate({
            where: { name: cat.name },
            defaults: cat
        });
    }
    console.log('  Категории обращений созданы');

    const socialStatuses = [
        { name: 'Безработный' },
        { name: 'Инвалид' },
        { name: 'Многодетный родитель' },
        { name: 'Ветеран' },
        { name: 'Выпускник' },
        { name: 'Предпенсионер' },
        { name: 'Беженец' }
    ];

    for (const status of socialStatuses) {
        await db.social_statuses.findOrCreate({
            where: { name: status.name },
            defaults: status
        });
    }
    console.log('  Социальные статусы созданы');

    const allCategories = await db.categories.findAll();
    const allStatuses = await db.social_statuses.findAll();

    const receptions = [
        {
            full_name: 'Иванов Иван Иванович',
            email: 'ivanov@mail.ru',
            address: 'г. Челябинск, ул. Ленина, д. 10',
            phone: '+79001234567',
            text_appeal: 'Прошу помочь с трудоустройством по специальности программист.',
            category_id: allCategories[0].id,
            social_status_id: allStatuses[0].id,
            processed: true
        },
        {
            full_name: 'Петрова Мария Сергеевна',
            email: 'petrova@mail.ru',
            address: 'г. Челябинск, ул. Кирова, д. 25',
            phone: '+79009876543',
            text_appeal: 'Хочу получить консультацию по пособию по безработице.',
            category_id: allCategories[1].id,
            social_status_id: allStatuses[2].id,
            processed: false
        },
        {
            full_name: 'Сидоров Алексей Петрович',
            email: 'sidorov@mail.ru',
            address: 'г. Челябинск, пр. Победы, д. 100',
            phone: '+79005554433',
            text_appeal: 'Прошу направить на курсы переподготовки.',
            category_id: allCategories[2].id,
            social_status_id: allStatuses[4].id,
            processed: false
        }
    ];

    for (const rec of receptions) {
        await db.reception.create(rec);
    }
    console.log('  Тестовые обращения созданы');

    const articles = [
        {
            cover: '/images/articles/article1.jpg',
            head: 'Как составить эффективное резюме',
            preview: 'Узнайте основные правила создания резюме, которое привлечёт внимание работодателей.',
            body: 'Резюме — это ваш первый контакт с работодателем. Оно должно быть структурированным, кратким и содержать релевантную информацию. Указывайте только реальный опыт работы, навыки и достижения.'
        },
        {
            cover: '/images/articles/article2.jpg',
            head: 'Ярмарка вакансий 2024',
            preview: 'Приглашаем всех на ежегодную ярмарку вакансий в Челябинске.',
            body: 'Ярмарка вакансий пройдёт в выставочном центре. Более 50 компаний представят свои вакансии. Вход свободный. Приходите с резюме!'
        },
        {
            cover: '/images/articles/article3.jpg',
            head: 'Бесплатные курсы переподготовки',
            preview: 'Биржа труда предлагает бесплатные курсы по востребованным специальностям.',
            body: 'Программы обучения включают: веб-разработка, бухгалтерия, менеджмент, дизайн. Обучение длится от 3 до 6 месяцев. По окончании выдается сертификат.'
        }
    ];

    for (const art of articles) {
        await db.articles.findOrCreate({
            where: { head: art.head },
            defaults: art
        });
    }
    console.log('  Статьи созданы');

    const emails = [
        { email: 'info@labor-exchange.ru' },
        { email: 'support@labor-exchange.ru' },
        { email: 'hr@labor-exchange.ru' }
    ];

    for (const em of emails) {
        await db.email_storage.findOrCreate({
            where: { email: em.email },
            defaults: em
        });
    }
    console.log('  Email-хранилище заполнено');

    const indicators = [
        { period: 'Январь 2024', unemployed: 1250, are_registered: 890, number_of_vacancies: 3200 },
        { period: 'Февраль 2024', unemployed: 1180, are_registered: 850, number_of_vacancies: 3400 },
        { period: 'Март 2024', unemployed: 1100, are_registered: 800, number_of_vacancies: 3600 },
        { period: 'Апрель 2024', unemployed: 1050, are_registered: 780, number_of_vacancies: 3800 },
        { period: 'Май 2024', unemployed: 980, are_registered: 720, number_of_vacancies: 4100 },
        { period: 'Июнь 2024', unemployed: 920, are_registered: 680, number_of_vacancies: 4300 }
    ];

    for (const ind of indicators) {
        await db.labor_market_indicators.findOrCreate({
            where: { period: ind.period },
            defaults: ind
        });
    }
    console.log('  Индикаторы рынка труда созданы');

    console.log('База данных полностью инициализирована и заполнена!\n');
};