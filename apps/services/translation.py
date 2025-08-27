from modeltranslation.translator import TranslationOptions, translator

from apps.services.models import MovingService


class MovingServiceTranslationOptions(TranslationOptions):
    fields = ('title', 'subtitle', 'description', 'button_text')


translator.register(MovingService, MovingServiceTranslationOptions)
