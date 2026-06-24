from django.urls import path,include
from .views import TaskListView,TaskDetailView

urlpatterns = [
    path("", TaskListView.as_view()),
    path("<int:pk>/", TaskDetailView.as_view()),
]