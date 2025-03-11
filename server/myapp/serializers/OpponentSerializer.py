from rest_framework import serializers
from myapp.entities.OpponentModel import Summary, Attacking, Passing, Defending, Other, Opponent

class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = '__all__'
    
class AttackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attacking
        fields = '__all__'
    
class PassingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passing
        fields = '__all__'
    
class DefendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defending
        fields = '__all__'
    
class OtherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Other
        fields = '__all__'
    
class OpponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opponent
        fields = '__all__'