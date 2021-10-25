from django.urls import path, include
from . import views

app_name = 'articles'


urlpatterns = [
    path('<int:user>/articles',views.ArticleListAPIView.as_view(), name="article_user"),
    path('<int:pk>/', views.ArticleDetailAPIView.as_view(), name='article_detail'),
    path('', views.ArticleListAPIView.as_view(), name='article_list'),
]