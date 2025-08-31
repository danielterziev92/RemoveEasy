export const bg = {
    inventory: {
        errors: {
            fetchError: "Грешка при извличане на данни",
            invalidApiResponse: "Невалиден отговор от API",
            skippedInvalidItem: "Пропуснат невалиден елемент:",
            skippedInvalidSection: "Пропусната невалидна секция:",
            noValidSections: "Няма валидни секции в отговора",
            invalidSectionTitle: "Невалиден заглавие на секция",
            storeNotAvailable: "Store не е достъпен",
            invalidInventoryData: "Невалидни данни за инвентар"
        }
    },
    item: {
        errors: {
            itemIdRequired: "ID на елемента е задължително",
            itemIconRequired: "Иконата на елемента е задължителна",
            itemIconTooLong: "Иконата на елемента е твърде дълга",
            itemTitleRequired: "Заглавието на елемента е задължително",
            itemTitleTooLong: "Заглавието на елемента е твърде дълго",
            itemSectionRequired: "Секцията на елемента е задължителна",
            invalidItemData: "Невалидни данни за елемент"
        }
    },
    section: {
        errors: {
            sectionIconRequired: "Иконата на секцията е задължителна",
            sectionIconTooLong: "Иконата на секцията е твърде дълга",
            sectionTitleRequired: "Заглавието на секцията е задължително",
            sectionTitleTooLong: "Заглавието на секцията е твърде дълго",
            invalidSectionData: "Невалидни данни за секция"
        }
    },
    api: {
        errors: {
            serverError: "Сървърна грешка",
            networkError: "Мрежова грешка",
            requestTimeout: "Времето за заявката изтече",
            unknownError: "Неизвестна грешка",
            invalidResponse: "Невалиден отговор",
            missingData: "Липсващи данни"
        }
    },
    header: {
        navigation: {
            about: "За нас",
            services: "Услуги",
            howItWorks: "Как работи",
            testimonials: "Отзиви",
            contact: "Контакти"
        },
        actions: {
            openMenu: "Отвори меню",
            closeMenu: "Затвори меню",
            navigation: "Навигация",
            close: "Затвори"
        },
        company: {
            name: "Re Move Easy",
            tagline: "MEN & VAN SERVICES"
        }
    },
    heroSection: {
        professionalMovingServices: "Професионални преместващи услуги",
        safeReliableRelocationServices: "Сигурни и надеждни услуги за преместване",
        affordableReliableTransport: "Достъпни и надеждни транспортни и преместящи услуги в цяла Великобритания за български и британски клиенти.",
        getFreeQuote: "Безплатна оферта",
        callUsNow: "Обадете ни се",
        ukWideService: "Услуги в цяла Великобритания",
        yearsExperience: "8+ години опит",
        bulgarianEnglishSpeaking: "Персонал на български/английски",
        serviceOnChosenDay: "Услуга в избран от вас ден"
    },
    aboutSection: {
        aboutTitle: "За Re Move Easy",
        foundedDescription: "Основана през 2017 г., Re Move Easy се превърна в една от най-доверените услуги за преместване за български и британски семейства в цяла Великобритания.",
        missionDescription: "Нашата мисия е да направим вашето преместване възможно най-спокойно, като предоставяме надеждни, достъпни и персонализирани услуги, които отговарят на вашите конкретни нужди.",
        teamDescription: "С екип от опитни професионалисти, които говорят свободно български и английски език, премостваме културни бариери и гарантираме ясна комуникация през целия процес на вашето преместване.",
        successfulMoves: "Успешни премествания",
        yearsExperience: "Години опит",
        teamAltText: "Екипът на Re Move Easy",
        slogan: "„Вие избирате помощта,\nние се грижим за останалото\""
    },
    servicesSection: {
        sectionTitle: "Нашите Услуги",
        sectionDescription: "Изберете услугата, която най-добре отговаря на вашите нужди",
        describeInventoryButton: "Опиши инвентар",

        // Transport Only Service
        transportOnlyTitle: "Само транспорт",
        transportOnlySubtitle: "Бюджетно и бързо решение!",
        transportOnlyDescription: "Перфектно решение, когато имате нужда само от транспорт на вещите си от едно място до друго. Вие се грижите за товаренето и разтоварването, ние за безопасния транспорт.",
        transportOnlyPrice: "От £80",
        transportOnlyEconomical: "икономично и гъвкаво решение за вашето преместване",
        transportOnlyFlexible: "вие решавате кога да опаковате и преместите вещите",
        transportOnlyCareful: "ние подреждаме внимателно и фиксираме старателно",

        // Transport with Helpers Service
        transportWithHelpersTitle: "Транспорт с помощници",
        transportWithHelpersSubtitle: "Вие избирате помощта – ние ще поемем тежестта!",
        transportWithHelpersDescription: "Осигуряваме транспорт, хора и оборудване с които да ви помогнат при товаренето и разтоварването на всички тежки вещита, правейки целия процес по-бърз и лесен.",
        transportWithHelpersPrice: "От £115",
        transportWithHelpersExperience: "Дългогодишен опит - хиляди решения",
        transportWithHelpersEquipment: "Професионално оборудване с перфектен резултат",
        transportWithHelpersPrecision: "Преместваме с уважение и прецизност",

        // Full Service Relocation
        fullServiceTitle: "Пълно обслужване при преместване",
        fullServiceSubtitle: "Без стрес и хаос – ние вършим всичко вместо вас!",
        fullServiceDescription: "С тази услуга ви предлагаме – спокойствие, сигурност и пълна организация от началото до края.\nОставете на нас всичко – от осигуряването на нужните опаковъчни материали и внимателното опаковане на вещите ви, до безопасното им транспортиране и подреждане на новото място.\nНе се налага да вдигате нищо тежко, да организирате логистика или да се тревожите за щети – ние ще се погрижим за всяка стъпка от процеса.",
        fullServicePrice: "От £290",
        fullServiceStressFree: "най-без стресовата и удобна услуга за цялостно преместване на дом или офис",
        fullServiceSuitable: "Подходяща за заети хора, семейства, възрастни и всеки, който иска комфорт без усилие",
        fullServiceComplete: "Без стрес, без риск и 100% комфорт. Просто ни повикайте — ние поемаме всичко останалото!"
    }

};