import {Star} from "lucide-react";

import useTranslation from "@/hooks/useTranslation.ts";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {REVIEW_SECTION_KEYS} from "@/shared/messages/messages.ts";

export default function ReviewSection() {
    const {t} = useTranslation();

    const reviewsData = [
        // London reviews (60%)
        {
            name: "Теодора Димитрова",
            location: "Хакни до Челси, Лондон",
            text: "Re Move Easy направи преместването ни в Лондон много гладко. Екипът беше професионален, точен и изключително внимателен с вещите ни. Бях особено впечатлена от това как се справиха с антикварните ни мебели. Горещо препоръчвам!",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Finley Montgomery",
            location: "Islington to Richmond, London",
            text: "Having moved several times in London, I can honestly say Re Move Easy provided the best service I've experienced. Their attention to detail and care for my possessions was outstanding. The whole process was stress-free from start to finish.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },
        {
            name: "Калоян Стоянов",
            location: "Камдън до Кенсингтън, Лондон",
            text: "Екипът беше фантастичен и беше страхотно да говоря на български с тях по време на преместването. Те бяха изключително ефективни и се грижеха много добре за вещите ми. Цената беше справедлива и нямаше скрити такси.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Rowan Thatcher",
            location: "Greenwich to Hammersmith, London",
            text: "The team arrived on time and were very efficient. They handled my belongings with care and were very polite. There was a slight issue with parking, but they managed to resolve it quickly. Overall, a very good service.",
            rating: 4,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },
        {
            name: "Биляна Христова",
            location: "Бриксън до Шордич, Лондон",
            text: "Не мога да изразя колко благодарна съм за помощта им при преместването ми. Екипът беше дружелюбен, говореше свободно български и направи целия опит без стрес. Те бяха внимателни с всичките ми вещи и приключиха по-рано от очакваното!",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Hadrian Powell",
            location: "Clapham to Fulham, London",
            text: "Re Move Easy provided excellent service for my flat move. They were careful with my items, especially my piano which was a concern. Some minor communication issues when scheduling, but the actual moving team was perfect.",
            rating: 4,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },

        // London to other cities reviews (40%)
        {
            name: "Адриана Василева",
            location: "Лондон до Оксфорд",
            text: "Преместването от Лондон до Оксфорд изглеждаше обезкуражаващо, докато не открих Re Move Easy. Техният двуезичен екип направи комуникацията безпроблемна. Те бяха точни, ефикасни и се отнесоха с изключително внимание към колекцията ми от академични книги.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Percival Brookstone",
            location: "London to Cambridge",
            text: "Re Move Easy helped me relocate my entire apartment from London to Cambridge. The movers were professional and efficient. They carefully packed all my items and ensured everything arrived in perfect condition. Highly recommended!",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },
        {
            name: "Велислава Тодорова",
            location: "Лондон до Брайтън",
            text: "Екипът от Re Move Easy направи преместването ми от Лондон до Брайтън невероятно гладко. Говоренето на български с мувърите направи всичко по-лесно за координиране. Те бяха изключително внимателни с вещите ми и цената беше много разумна.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Barnaby Winterbourne",
            location: "London to Bath",
            text: "Re Move Easy's service was mostly excellent. The team was professional and careful with my belongings. The only minor issue was a slight delay in arrival, but they did call ahead to notify me. The price was reasonable for the quality of service.",
            rating: 4,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },
        {
            name: "Любомир Ангелов",
            location: "Лондон до Бристол",
            text: "Изключително обслужване от началото до края! Екипът пристигна навреме, внимателно опакова всичко и достави всичките ми вещи в Бристол без нито една драскотина. Възможността да говоря с тях на български направи целия процес много по-комфортен.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Oriana Blackwood",
            location: "London to Southampton",
            text: "Re Move Easy provided good value for money. The team was efficient and professional, though there were some minor communication issues. They took good care of my furniture and other possessions during the move from London to Southampton.",
            rating: 4,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },

        // Other cities to London reviews (20%)
        {
            name: "Десислава Иванова",
            location: "Манчестър до Лондон",
            text: "Re Move Easy направиха преместването ми от Манчестър до Лондон без стрес и ефикасно. Българските мувъри бяха не само професионални, но и осигуриха успокояващо чувство за близост през потенциално стресиращо време. Всичко пристигна непокътнато и по график.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        },
        {
            name: "Thaddeus Harrington",
            location: "Edinburgh to London",
            text: "Moving from Edinburgh to London was a huge undertaking, but Re Move Easy handled it brilliantly. They were punctual, careful with my possessions, and very reasonably priced given the distance. There was one small delay due to traffic, but they kept me informed throughout.",
            rating: 4,
            customerType: REVIEW_SECTION_KEYS.britishCustomer
        },
        {
            name: "Божидар Стефанов",
            location: "Бирмингам до Лондон",
            text: "Не мога да благодаря достатъчно на Re Move Easy за това, че направиха преместването ми от Бирмингам до Лондон толкова лесно. Екипът беше дружелюбен, ефикасен и изключително внимателен с вещите ми. Възможността да общувам на български беше неочакван бонус, который направи целия опит още по-добър.",
            rating: 5,
            customerType: REVIEW_SECTION_KEYS.bulgarianCustomer
        }
    ];

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        size={18}
                    />
                ))}
            </div>
        );
    };

    return (
        <section id="testimonials" className="section-padding bg-white py-16 md:py-24">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                        {t(REVIEW_SECTION_KEYS.sectionTitle)}
                    </h2>
                    <p className="text-sm md:text-base text-gray-700 px-4 md:px-0">
                        {t(REVIEW_SECTION_KEYS.sectionDescription)}
                    </p>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Carousel opts={{align: "start", loop: true}} className="w-full">
                        <CarouselContent>
                            {reviewsData.map((review, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                    <Card className="h-full">
                                        <CardContent className="flex flex-col justify-between h-full p-6">
                                            <div>
                                                <div className="mb-4">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <blockquote className="text-gray-700 mb-6 italic">
                                                    "{review.text}"
                                                </blockquote>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{review.name}</p>
                                                <p className="text-gray-600 text-sm">{review.location}</p>
                                                <p className="text-xs text-primary mt-1">{t(review.customerType)}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="mt-8 flex justify-center gap-2">
                            <CarouselPrevious className="static translate-y-0"/>
                            <CarouselNext className="static translate-y-0"/>
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}