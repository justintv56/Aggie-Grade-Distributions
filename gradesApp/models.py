from django.db import models

# Create your models here.

class Gradesdata(models.Model):
    id = models.IntegerField(blank=True, primary_key = True)
    dept = models.TextField(blank=True, null=True)
    num = models.IntegerField(blank=True, null=True)
    prof = models.TextField(blank=True, null=True)
    sect = models.IntegerField(blank=True, null=True)
    sem = models.TextField(blank=True, null=True)
    yr = models.IntegerField(blank=True, null=True)
    gpa = models.FloatField(blank=True, null=True)
    a = models.IntegerField(blank=True, null=True)
    b = models.IntegerField(blank=True, null=True)
    c = models.IntegerField(blank=True, null=True)
    d = models.IntegerField(blank=True, null=True)
    f = models.IntegerField(blank=True, null=True)
    q = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.dept + " " +  str(self.num) + " " + self.prof
    class Meta:
        managed = False
        db_table = 'gradesdata'