from django.contrib import admin
from django.utils.safestring import mark_safe
# Register your models here.
from .models import Product  # 例程使用
from django.utils.html import format_html


# class UploadModelAdmin(admin.ModelAdmin):
#     form = Product
#
#
# admin.site.register(Product, UploadModelAdmin)  # 注册模型和模型管理器，别忘了，否则不显示


class YourAdmin(admin.ModelAdmin):  # 例程使用
    # form = UploadForm
    list_display = ('product_id', 'product_uuid', 'create_time',
                    'last_updateTime', 'product_type', 'product_state',
                    'product_name', 'product_address', 'product_body',
                    'short_content', "product_image")
    # list_display = ('product_id', "product_image")
    list_display_links = ('product_id', 'product_uuid',)


admin.site.register(Product, YourAdmin)  # 例程使用

admin.site.site_header = "泰星达后台管理系统"
admin.site.site_title = "泰星达后台管理系统"
