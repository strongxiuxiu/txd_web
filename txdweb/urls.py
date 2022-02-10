"""txdweb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import url, include

from txdweb import settings
from django.views.static import serve
from django.shortcuts import render
from loginapp.views import params


def index(request):
    return render(request, 'index/index.html')


@params("系统日志", '进入了网站首页', 1)
def web_index(request):
    # return render(request, 'main/web_index.html')
    return render(request, 'Product/product_list.html')


urlpatterns = [
    # 处理 media 信息，用于图片获取
    re_path(r'media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    path('admin/', admin.site.urls),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}, name='static'),
    url(r'^$', index),
    url(r'^web_index$', web_index),
    url(r'^product/', include('productapp.urls')),
    url(r'^login/', include('loginapp.urls')),
    # url(r'^user/', include('usermanage.urls')),
]
