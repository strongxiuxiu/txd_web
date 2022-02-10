"""
@Time   :
@Author :
@Desc   :

"""
from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(
        required=True, error_messages={
            'required': '用户名不能为空'})
    password = forms.CharField(required=True, min_length=6, max_length=10,
                               error_messages={'required': '密码不能为空',
                                               'min_length': '最少输入6位',
                                               'max_length': '最多输入10位'
                                               }
                               )
