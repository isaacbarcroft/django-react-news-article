from django.shortcuts import render
from .models import Article 
from .serializers import ArticleSerializer
from rest_framework import generics

# Create your views here.

class ArticleListAPIView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

