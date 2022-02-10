"""
pas
"""
import json
import uuid
import datetime

from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.utils import timezone

from txdweb import web_conf  # 自己写的配置文件
from logapp.models import Log
from loginapp import forms
from usermanage import models
from datetime import timedelta

from txdweb.public_function import ErrorDataFormat, SuccessDataFormat  # 成功和失败的返回信息
from txdweb.public_function import get_weixin
from django.utils.translation import ugettext_lazy as _
from django.core.cache import cache  # 引入缓存模块

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions


class ExpiringTokenAuthentication(TokenAuthentication):
    """
        重写TokenAuthentication的方法添加token的过期时间
    """

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed(_('Invalid token.'))
        if not token.user.is_active:
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))
        if timezone.now() > (
                token.created + timedelta(1)):
            raise exceptions.AuthenticationFailed(_('Token has expired'))
        return (token.user, token)


def token_auth(func):
    """ 这是一个token认证机制的装饰器"""

    def token_authentication(request, *arg, **kwargs):
        #print(request, 33333333333333333333333344)
        # if request.method == 'POST':
        try:
            #print(request, 333333333)
            #print(request.headers, 33333)
            #print(request.headers["Openid"], 333333)
            if cache.has_key(request.headers["Openid"]):
                cache.set(request.headers["Openid"], request.headers['Cookie'], 24 * 60 * 60)
            else:
                result = web_conf.ResponseCodes(operation='无效的token').token_timeout()
                #print(result, 4444444444)
                return JsonResponse(result)
        except Exception as e:
            #print(e)
            result = web_conf.ResponseCodes(operation='无效的token').token_timeout()
            #print(result,4444444444)
            return JsonResponse(result)
        return func(request, *arg, **kwargs)

    return token_authentication


def login_token_auth(func):
    """ 这是一个token认证机制的装饰器"""

    def token_authentication(request, *arg, **kwargs):
        # if request.method == 'POST':
        try:
            #print(123123123123123)
            aa = ExpiringTokenAuthentication()
            user_name, token = aa.authenticate(request)
            if cache.has_key(user_name):
                cache.set(user_name, token, 24 * 60 * 60)
                # return user_name
                request.session["user_name"] = user_name
            else:
                status = Token.objects.filter(key=token).update(
                    created=datetime.datetime.now())  # 每次获取访问api接口都会更新token的有效时间
                cache.set(user_name, token, 24 * 60 * 60)
                request.session["user_name"] = user_name
        except Exception as e:
            #print(e)
            result = web_conf.ResponseCodes(operation='无效的token').token_timeout()
            return JsonResponse(result, status=403)

        return func(request, *arg, **kwargs)

    return token_authentication


# Create your views here.
def params(*info):
    def check_login(func):  # 自定义登录验证装饰器
        def warpper(request, *args, **kwargs):
            is_login = request.session.get('is_login', False)
            # username = request.session.get('username', False)
            role = request.session.get('role', False)
            # id = request.session.get('id', False)
            # request.session['username'] = username
            # request.session['is_login'] = True
            # request.session['role'] = "系统管理员"
            # request.session['id'] = user.id
            # #print(request.user.username)
            if is_login:
                log_create = Log(
                    log_body=info[0],
                    operational_body=info[1],
                    operating_level=info[2],
                    operator_username=request.user.username,
                    operator_role=role,
                    operational_time=timezone.now)
                log_create.save()
                # #print(111111111111111111111111111, "登录成功")
                return func(request, *args, **kwargs)
            else:
                print(123123)
                return redirect("/login/index")

        return warpper

    return check_login


def user_login(request):
    if request.method == 'POST':

        username = request.POST.get('username')
        # if models.UserProfile.objects.filter(username=username).values('account_status'):

        password = request.POST.get('password')
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    request.session['username'] = username
                    request.session['is_login'] = True
                    request.session['role'] = "系统管理员"
                    request.session['id'] = user.id
                    login(request, user)
                    result = SuccessDataFormat(
                        chMessage=web_conf.sys_code["800000"],
                        code=1).result()
                    return JsonResponse(result, safe=False)
            result = ErrorDataFormat(
                chMessage=web_conf.sys_code["800001"]).result()
            return JsonResponse(result, safe=False)
        else:
            result = ErrorDataFormat(
                chMessage=web_conf.sys_code["800002"],
            ).result()
            return JsonResponse(result, safe=False)
    else:
        form = forms.LoginForm()
    print(1111111)
    return render(request, 'login/login.html', {'form': form})


def user_login_procedure(request):
    if request.method == 'POST':
        request.POST = json.loads(request.body)
        username = request.POST.get('username')
        # if models.UserProfile.objects.filter(username=username).values('account_status'):
        password = request.POST.get('password', "111111")
        code = request.POST.get('code')
        {'session_key': 'n0eVBQURDRhuqKFMsC6r1w==', 'openid': 'oJTRg5KwHJrkCa1xGqrxY0Eig5mU'}
        # if code:
        wx_status = get_weixin(code)

        wx_status

        #print(request.POST)
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=username, password=password)
            #print(user, 333333333333333333333333)
            if user:
                login(request, user)
                if user.is_active:

                    request.session['username'] = username
                    request.session['is_login'] = True
                    request.session['role'] = "系统管理员"
                    request.session['id'] = user.id
                    #print(request.session.session_key, 66666666666666666666)
                    token_info = Token.objects.filter(user_id=user.id).all().values()
                    if token_info:
                        Token.objects.filter(user_id=user.id).update(created=datetime.datetime.now())
                        user_infos = []
                        user_dict = {}
                        for i in token_info:
                            # user_dict = {}
                            user_dict['token'] = 'token %s' % (wx_status['session_key'])
                            user_dict['sessionid'] = 'sessionid=%s' % (wx_status['session_key'])
                            # request.session.session_key
                            user_dict['username'] = username
                            user_infos.append(user_dict)
                            result = web_conf.ResponseCodes(operation='登录成功', result=user_infos).success()
                            return JsonResponse(result, safe=False)

                    else:
                        uuids = uuid.uuid1()
                        Token.objects.create(user_id=user.id, created=datetime.datetime.now(), key=uuids)
                        user_infos = []
                        user_dict = {}
                        user_dict['token'] = 'token %s' % (uuids)
                        user_dict['username'] = username
                        user_dict['sessionid'] = 'sessionid=%s' % (request.session.session_key)
                        user_infos.append(user_dict)
                        result = web_conf.ResponseCodes(operation='登录成功', result=user_infos).success()
                        return JsonResponse(result, safe=False)
                    # data = models.UserProfile.objects.filter(user_id=user.id).values("user_grader", 'team',
                    #                                                                  "account_status", )
                    # for i in data:
                    #     if i["account_status"] == "0":
                    #         result = ErrorDataFormat(
                    #             chMessage=web_conf.sys_code["800010"]).result()
                    #         return JsonResponse(result, safe=False)
                    #     # #print(i, 3333333)
                    #     request.session['grade_id'] = i["user_grader"]
                    #     request.session['account_status'] = i["account_status"]
                    #     request.session['team'] = i['team']
                    #     # token = str(user.id) + "," + str(uuid.uuid1())
                    #     # request.session['token'] = token
                    #     login(request, user)
                    #     # i['token'] = token
                    #     login(request, user)
                    #     result = SuccessDataFormat(
                    #         chMessage=web_conf.sys_code["800000"], data=user_dict,
                    #         code=1).result()
                    #     #print(result, 33344)
                    #     # if i["user_grader"] == web_conf.sys_admin:
                    #     #     #print(111)
                    #     #     return render(request, 'Users/Users_management.html')
                    #     # else:
                    #     #     #print(222)
                    #     #     return render(request, "main/index.html")
                    #     return JsonResponse(result, safe=False)
                    # result = ErrorDataFormat(
                    #     chMessage=web_conf.sys_code["800007"]).result()
                    # return JsonResponse(result, safe=False)
            else:
                result = ErrorDataFormat(
                    chMessage=web_conf.sys_code["800001"]).result()
                return JsonResponse(result, safe=False)
        else:
            result = ErrorDataFormat(
                chMessage=web_conf.sys_code["800002"],
            ).result()
            return JsonResponse(result, safe=False)
    else:
        form = forms.LoginForm()
    return render(request, 'login/login.html', {'form': form})


def user_login_procedure(request):
    if request.method == 'POST':
        request.POST = json.loads(request.body)
        #print(request.POST)
        username = request.POST.get('username')
        # if models.UserProfile.objects.filter(username=username).values('account_status'):
        password = request.POST.get('password', "111111")
        code = request.POST.get('code')
        # {'session_key': 'n0eVBQURDRhuqKFMsC6r1w==', 'openid': 'oJTRg5KwHJrkCa1xGqrxY0Eig5mU'}
        wx_status = get_weixin(code)
        user_infos = []
        user_dict = {}
        user_dict['sessionid'] = 'sessionid=%s' % (wx_status['session_key'])
        user_dict['openid'] = wx_status['openid']
        user_infos.append(user_dict)
        if cache.has_key(username):
            cache.set(wx_status['openid'], 'sessionid=%s' % (wx_status['session_key']),
                      24 * 60 * 60)
            # request.session["user_name"] = user_name
        else:
            #     status = Token.objects.filter(key=token).update(
            #         created=datetime.datetime.now())  # 每次获取访问api接口都会更新token的有效时间
            cache.set(wx_status['openid'], 'sessionid=%s' % (wx_status['session_key']), 24 * 60 * 60)

        if models.UserProfile.objects.filter(openid=wx_status['openid']):

            result = web_conf.ResponseCodes(operation='登录成功', result=user_infos).success()
            return JsonResponse(result, safe=False)
        else:
            users = User.objects.create_user(
                username=wx_status['openid'], password=password, is_staff=1)
            users.is_active = False
            users.save()
            models.UserProfile.objects.create(openid=wx_status['openid'], name=username,
                                              account_status=2, user_id=users.id, team_f_id=3)  # 2 等于用户状态为普通用户
            result = web_conf.ResponseCodes(operation='登录成功', result=user_infos).success()
            return JsonResponse(result, safe=False)
    result = ErrorDataFormat(
        chMessage=web_conf.sys_code["410011"],
    ).result()
    return JsonResponse(result, safe=False)


def user_logout(request):
    var = request.session.get('username')
    logout(request)
    return redirect("/login/index")


def user_logout_procedure(request):
    try:
        #print(request.POST)
        #print(request.session)
        #print(request.body)
        #print(request.headers)

        logout(request)
        var = request.session.get('username')
        #print(var)

        result = web_conf.ResponseCodes(operation='退出成功').success()
        return JsonResponse(result, safe=False)
    except:
        result = web_conf.ResponseCodes().error()
        return JsonResponse(result, safe=False)


def page_permission_denied(request, exception):
    return render(request, 'error/prompt-403.html')


def log_error(request, exception):
    return render(request, 'error/prompt-404.html')


def page_inter_error(request):
    return render(request, 'error/prompt-500.html')


def test(request):
    return render(request, 'test/test_user.html')
