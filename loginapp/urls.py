"""

@Desc   : 用户登录

"""
from django.conf.urls import url
from . import views

urlpatterns = [
    # post views
    url(r'index/$', views.user_login, name='login'),  # 登录

    url(r'index/procedure/$', views.user_login_procedure, name='login'),  # 登录

    url(r'logout/$', views.user_logout, name='logout'),  # 退出登录
    url(r'logout/procedure/$', views.user_logout_procedure, name='logout'),  # 退出登录
    # user_logout_procedure

    url(r'test/$', views.test, name='login'),  # 登录
]
