from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Task
from .serializers import TaskSerializer

# Create your views here.

class TaskListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        # Give me ONLY the tasks of the logged-in user.
        tasks = Task.objects.filter(
            user=request.user
        )

        serializer = TaskSerializer(
            tasks,
            many=True
        )

        return Response(serializer.data)
    
    def post(self, request):

        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(
                user=request.user #auto attached with task
            )

            return Response(
                serializer.data,
                status=201
            )
        return Response(
            serializer.errors,
            status=400
        )


class TaskDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
      return get_object_or_404(              # 404 Not Found if the task doesn't exist.
        Task,
        pk=pk,
        user=user
    )

    def put(self, request, pk):

        task = self.get_object(
            pk,
            request.user
        )

        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )
        
        return Response(
            serializer.errors,status=400
        )
    
    def delete(self, request, pk):

        task = self.get_object(
            pk,
            request.user
        )

        task.delete()

        return Response(
            {
                "message": "Task delete"
            }
        )

    
      