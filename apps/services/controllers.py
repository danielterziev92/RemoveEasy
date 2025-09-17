from http import HTTPStatus

from ninja import Query
from ninja_extra import api_controller, ControllerBase, http_get

from apps.services.models import MovingService
from apps.services.schemas import MovingServicesResponseSchema, MovingServiceSchema


@api_controller("/services")
class ServicesController(ControllerBase):

    @http_get(
        path="/",
        response={
            HTTPStatus.OK: MovingServicesResponseSchema,
        }
    )
    def get_all_services(self, include_inactive: bool = Query(False)):
        """Get all moving services."""
        queryset = MovingService.objects.all()

        if not include_inactive:
            queryset = queryset.filter(is_active=True)

        services_data = [MovingServiceSchema.model_validate(service, from_attributes=True) for service in queryset]
        return MovingServicesResponseSchema(services=services_data)
