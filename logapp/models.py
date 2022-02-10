from django.db import models

# Create your models here.


from django.db import models


# Create your models here.

# 日志表
class Log(models.Model):
    id = models.AutoField(primary_key=True)
    log_body = models.CharField(max_length=50, blank=False)
    operational_body = models.CharField(max_length=50, blank=False)
    operator_username = models.CharField(max_length=50, blank=False)
    operational_time = models.DateTimeField(auto_now=True, blank=False)
    operator_role = models.CharField(max_length=50, blank=False)
    operating_level = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'systems_log'  # 通过db_table自定义数据表名
