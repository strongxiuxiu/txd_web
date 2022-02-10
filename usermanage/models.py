from uuid import uuid1
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                related_name='profile')
    # 模型类中设置:blank=True,表示代码中创建数据库记录时该字段可传空白(空串,空字符串)
    head_portrait = models.CharField('head_portrait', max_length=200, blank=True)  # 头像
    self_description = models.CharField('self_description', max_length=50, blank=True)  # 自我描述
    name = models.CharField('name', max_length=50, blank=True)  # 姓名
    gender = models.CharField('gender', max_length=50, blank=True)  # 性别
    id_number = models.CharField('id_number', max_length=50, blank=True)  # 身份证号
    phone_number = models.CharField('phone_number', max_length=50, blank=True)  # 手机号
    position = models.CharField('position', max_length=50, blank=True)  # 职位
    job_number = models.CharField('position', max_length=50, blank=True)  # 工号
    user_grader = models.CharField('user_grader', max_length=50, blank=True)  # 用户等级
    account_type = models.CharField('account_type', max_length=50, blank=True)  # 账号种类
    account_status = models.CharField('account_status', max_length=50, blank=True)  # 账号状态
    openid = models.CharField('openid', max_length=50, blank=True)  # 微信用户的openid

    class Meta:
        verbose_name = 'User_profile'
