from django.urls import path, include
from . import views

app_name = 'articles'


urlpatterns = [
    path('<int:pk>/', views.ArticleDetailAPIView.as_view(), name='article_detail'),
    path('', views.ArticleListAPIView.as_view(), name='article_list'),
    path('<int:user>/articles',views.ArticleListAPIView.as_view(), name="artocle_user"),
]