"""

@Desc   : 竞拍管理

"""
from django.conf.urls import url
from . import views

app_name = 'app'

urlpatterns = [
    # post views

    url(r'product$', views.product_index,
        name='auction_case_manages'),  # 案件信息跳转

    url(r'web_product_index$', views.web_product_list,
        name='web_product_list'),  # 后台管理

    url(r'web_product_info/$', views.web_product_info,
        name='web_product_info'),  # 后台管理

    url(r'web_product_add$', views.web_product_add,
        name='web_product_add'),  # 后台管理

    url(r'details$', views.product_details,
        name='product_details'),  # 案件信息跳转

    url(r'file$', views.product_file,
        name='product_file'),  # 案件信息跳转

    url(r'product_a$', views.product_a,
        name='product_a'),  # 案件信息跳转

    url(r'all$', views.product_all,
        name='product_all'),  # 案件信息跳转

    url(r'add/$', views.product_object_add,
        name='add'),  # 案件信息跳转

    url(r'edit/$', views.product_object_edit,
        name='edit'),  # 案件信息跳转

    url(r'delete/$', views.product_object_delete,
        name='delete'),  # 案件信息跳转

    url(r'file/remove/$', views.file_remove,
        name='auction_file_remove'),  # 删除图片文件

    url(r'update/$', views.file_updates, name='update'),  # 上传图片文件

    url(r'download/list/$', views.file_list, name='file_list'),  # 百度网盘list

    url(r'about_us$', views.web_about_us,
        name='web_about_us'),  # 关于我们

    url(r'contact_us$', views.web_contact_us,
        name='web_contact_us'),  # 联系我们

    url(r'news$', views.web_news,
        name='web_news'),  # 新闻中心

    url(r'serves$', views.web_serves,
        name='web_serves'),  # 服务与支持

    url(r'all_products$', views.web_all_products,
        name='web_all_products'),  # 产品展示

]
