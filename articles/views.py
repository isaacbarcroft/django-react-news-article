from .models import Article 
from .serializers import ArticleSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404

# Create your views here.

class ArticleListAPIView(generics.ListCreateAPIView):
    # queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permissions_classes = IsAuthenticatedOrReadOnly

    def get_queryset(self):
        # url api_v1/articles/ will only return publishef articles
        # url with options for an authenticated user will return articles filtered by that option
       
        if not self.request.user.is_anonymous:
            options_text = self.request.query_params.get('options')
            if options_text is not None:
                if options_text == 'ALL':
                    return Article.objects.filter(author=self.request.user)
                else:
                    return Article.objects.filter(options=options_text, author=self.request.user)
           
        categories_text = self.request.query_params.get('categories')
        if categories_text is not None:
            return Article.objects.filter(options='PUBLISHED', categories=categories_text)
        return Article.objects.filter(options='PUBLISHED')


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