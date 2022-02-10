from django.contrib import admin
from .models import Website


# Register your models here.
class WebsiteAdmin(admin.ModelAdmin):  # 例程使用

    list_display = ('website_uuid', 'create_time',
                    'website_name', 'background_image', 'website_logo')
    list_display_links = ('website_uuid', 'website_name')

    def has_add_permission(self, request):
        # 禁用添加按钮
        return False

    def has_delete_permission(self, request, obj=None):
        # 禁用删除按钮
        return False


admin.site.register(Website, WebsiteAdmin)  # 例程使用
