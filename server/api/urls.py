from django.urls import path
from .views import get_books, create_book, book_detail

urlpatterns = [
    path('books/', get_books, name='get_books'), #get: 
    path('books/create', create_book, name='create_book'), #post: , entity
    path('books/<int:pk>', book_detail, name='book_detail') #delete: /id  #put: /id, entity
]