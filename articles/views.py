from .models import Article 
from .serializers import ArticleSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404

# Create your views here.

class ArticleListAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permissions_classes = IsAuthenticatedOrReadOnly

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permissions_classes = IsOwnerOrReadOnly


# class ArticleListAPIView(generics.ListCreateAPIView):
#     serializer_class = ArticleSerializer

    # def get_queryset(self):
    #     author = self.kwargs['author_name']
    #     return Article.objects.filter(author=author)

    # def perform_create(self,serializer):
    #     author = get_object_or_404(Article, id=self.kwargs['author_name'])
    #     serializer.save(author=author, user=self.request.user)