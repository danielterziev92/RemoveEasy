src/
├── domain/
│ ├── aggregates/
│ │ └── Inventory.ts                    
│ ├── entities/
│ │ ├── Section.ts                      
│ │ ├── Item.ts                         
│ │ ├── Locale.ts                       
│ │ └── NavigationItem.ts               
│ ├── value-objects/
│ │ ├── SectionId.ts                    
│ │ ├── ItemId.ts                       
│ │ ├── ContactInfo.ts                  
│ │ └── LanguageConfig.ts               
│ ├── services/
│ │ ├── IInventoryService.ts            
│ │ ├── ILocalizationService.ts         
│ │ └── LocalizationDomainService.ts    
│ ├── repositories/
│ │ ├── IInventoryRepository.ts         
│ │ └── ILocalizationRepository.ts      
│ ├── errors/
│ │ ├── DomainValidationError.ts        
│ │ ├── SectionErrorCode.ts             
│ │ ├── ItemErrorCode.ts                
│ │ └── InventoryErrorCode.ts           
│ └── types/                              
│ ├── DomainError.ts                  
│ ├── InventoryError.ts               
│ └── LocalizationValidationError.ts
│
├── application/
│ ├── use-cases/
│ │ ├── inventory/
│ │ │ ├── FetchInventoryUseCase.ts
│ │ │ └── GetInventoryDataUseCase.ts
│ │ └── localization/
│ │ └── ChangeLanguageUseCase.ts 🆕
│ ├── services/
│ │ ├── HeaderViewService.ts
│ │ ├── NavigationService.ts
│ │ └── TranslationService.ts
│ ├── dto/
│ │ └── NavigationItemDto.ts
│ └── types/
│ ├── IInventoryErrorMessages.ts
│ └── IInventoryServiceErrorMessages.ts
│
├── infrastructure/
│ ├── persistence/
│ │ └── redux/
│ │ ├── store.ts
│ │ └── slices/
│ │ ├── inventorySlice.ts
│ │ └── localizationSlice.ts
│ ├── repositories/
│ │ ├── RTKInventoryRepository.ts
│ │ └── LocalStorageLocalizationRepository.ts
│ ├── clients/
│ │ └── InventoryApiClient.ts
│ └── types/
│ ├── InventoryApiResponse.ts
│ └── IInventoryApiErrorMessages.ts
│
├── presentation/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ └── types/
│ ├── HeaderProps.ts
│ ├── NavigationProps.ts
│ └── messages/
│
└── shared/
├── messages/
│ ├── error_messages.ts
│ └── ui_messages.ts
├── di/
│ ├── bindings/
│ │ ├── domainBindings.ts
│ │ ├── applicationBindings.ts
│ │ └── infrastructureBindings.ts
│ └── container.ts
├── constants/
└── localization/

domain/
│ ├── aggregates/
│ │ └── Inventory.ts # Единствен aggregate root
│ ├── entities/
│ │ ├── Section.ts # Entity (преместена)
│ │ ├── Item.ts # Entity  
│ │ ├── Locale.ts # Entity
│ │ └── NavigationItem.ts # Entity
│ ├── value-objects/
│ │ ├── SectionId.ts
│ │ ├── ItemId.ts
│ │ ├── ContactInfo.ts
│ │ └── LanguageConfig.ts
│ ├── services/ # Domain services
│ │ ├── IInventoryService.ts
│ │ ├── ILocalizationService.ts
│ │ └── LocalizationDomainService.ts
│ ├── repositories/ # Repository interfaces
│ │ ├── IInventoryRepository.ts
│ │ └── ILocalizationRepository.ts
│ ├── errors/ # Domain errors
│ │ ├── DomainValidationError.ts
│ │ ├── SectionErrorCode.ts
│ │ ├── ItemErrorCode.ts
│ │ └── InventoryErrorCode.ts
│ └── types/ # Pure domain types (не API)
│ ├── DomainError.ts
│ ├── InventoryError.ts
│ └── LocalizationValidationError.ts