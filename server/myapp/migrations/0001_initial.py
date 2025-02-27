# Generated by Django 5.1.5 on 2025-02-19 20:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attaque',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grosses_occasions_realisees', models.PositiveIntegerField(blank=True, null=True)),
                ('grosses_occasions_manquees', models.PositiveIntegerField(blank=True, null=True)),
                ('touchers_surface_reparation', models.PositiveIntegerField(blank=True, null=True)),
                ('tacles_recus_dernier_tiers', models.PositiveIntegerField(blank=True, null=True)),
                ('hors_jeux', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Defense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tacles_gagnes', models.CharField(blank=True, null=True)),
                ('tacles_totaux', models.IntegerField(blank=True, null=True)),
                ('interceptions', models.IntegerField(blank=True, null=True)),
                ('recuperations', models.IntegerField(blank=True, null=True)),
                ('degagements', models.IntegerField(blank=True, null=True)),
                ('erreurs_menant_a_un_but', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Duel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('duels', models.CharField(blank=True, null=True)),
                ('pertes_balle', models.IntegerField(blank=True, null=True)),
                ('duels_sol', models.CharField(blank=True, null=True)),
                ('duels_aeriens', models.CharField(blank=True, null=True)),
                ('dribbles', models.CharField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GardienDeBut',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('arrets_du_gardien', models.IntegerField(blank=True, null=True)),
                ('sorties_aeriennes', models.IntegerField(blank=True, null=True)),
                ('coup_de_pied_de_but', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='League',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('league_name', models.CharField(max_length=60)),
                ('image', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Passes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('passes_precises', models.IntegerField(blank=True, null=True)),
                ('touches', models.IntegerField(blank=True, null=True)),
                ('passes_vers_dernier_tiers', models.IntegerField(blank=True, null=True)),
                ('dans_le_dernier_tiers', models.CharField(blank=True, null=True)),
                ('longs_ballons', models.CharField(blank=True, null=True)),
                ('transversales', models.CharField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=255)),
                ('position', models.CharField(max_length=30)),
                ('age', models.IntegerField()),
                ('nationality', models.CharField(max_length=30)),
                ('image', models.CharField(max_length=255)),
                ('link', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Sommaire',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('possession', models.CharField(blank=True, null=True)),
                ('grandes_chances', models.PositiveIntegerField(blank=True, null=True)),
                ('total_tirs', models.PositiveIntegerField(blank=True, null=True)),
                ('arrets_gardien', models.PositiveIntegerField(blank=True, null=True)),
                ('corner', models.PositiveIntegerField(blank=True, null=True)),
                ('fautes', models.PositiveIntegerField(blank=True, null=True)),
                ('passes', models.PositiveIntegerField(blank=True, null=True)),
                ('tacles', models.PositiveIntegerField(blank=True, null=True)),
                ('coups_francs', models.PositiveIntegerField(blank=True, null=True)),
                ('cartons_jaunes', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=50)),
                ('entraineur', models.CharField(blank=True, max_length=50, null=True)),
                ('classement', models.CharField(blank=True, max_length=20, null=True)),
                ('joueurs_total', models.IntegerField(blank=True, null=True)),
                ('moyenne_age', models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tirs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_tirs', models.PositiveIntegerField(blank=True, null=True)),
                ('tirs_cadres', models.PositiveIntegerField(blank=True, null=True)),
                ('frappe_sur_poteau', models.PositiveIntegerField(blank=True, null=True)),
                ('tirs_non_cadres', models.PositiveIntegerField(blank=True, null=True)),
                ('tirs_bloques', models.PositiveIntegerField(blank=True, null=True)),
                ('tirs_dans_surface', models.PositiveIntegerField(blank=True, null=True)),
                ('tirs_hors_surface', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('is_manager', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Matche',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('scoreA', models.IntegerField()),
                ('scoreB', models.IntegerField()),
                ('state', models.CharField(choices=[('W', 'Win'), ('D', 'Draw'), ('L', 'Loss')], max_length=1)),
                ('league', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myapp.league')),
                ('teamA', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='teamA', to='myapp.team')),
                ('teamB', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='teamB', to='myapp.team')),
            ],
        ),
        migrations.CreateModel(
            name='GoalkeeperStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minutes_played', models.IntegerField()),
                ('saves', models.IntegerField()),
                ('saves_from_inside_box', models.IntegerField()),
                ('clearances', models.IntegerField()),
                ('blocked_shots', models.IntegerField()),
                ('shots_on_target', models.IntegerField()),
                ('shots_off_target', models.IntegerField()),
                ('rating', models.IntegerField()),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.matche')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.player')),
            ],
        ),
        migrations.CreateModel(
            name='PlayerStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('minutes_played', models.IntegerField()),
                ('shots_on_target', models.IntegerField()),
                ('shots_off_target', models.IntegerField()),
                ('shots_blocked', models.IntegerField()),
                ('dribble_attempts_successful', models.IntegerField()),
                ('touches', models.IntegerField()),
                ('accurate_passes', models.IntegerField()),
                ('total_passes', models.IntegerField()),
                ('key_passes', models.IntegerField()),
                ('crosses_accurate', models.IntegerField()),
                ('long_balls_accurate', models.IntegerField()),
                ('ground_duels_won', models.IntegerField()),
                ('aerial_duels_won', models.IntegerField()),
                ('fouls', models.IntegerField()),
                ('was_fouled', models.IntegerField()),
                ('clearances', models.IntegerField()),
                ('interceptions', models.IntegerField()),
                ('total_tackles', models.IntegerField()),
                ('dribbled_past', models.IntegerField()),
                ('rating', models.IntegerField()),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.matche')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.player')),
            ],
        ),
        migrations.CreateModel(
            name='Plays',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('playerID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myapp.player')),
                ('teamID', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='myapp.team')),
            ],
        ),
        migrations.CreateModel(
            name='TeamStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GardienDeBut', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.gardiendebut')),
                ('attaque', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.attaque')),
                ('defense', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.defense')),
                ('duels', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.duel')),
                ('matcheID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.matche')),
                ('passes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.passes')),
                ('sommaire', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.sommaire')),
                ('tirs', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.tirs')),
            ],
        ),
        migrations.CreateModel(
            name='ProfileManager',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=15)),
                ('birthday', models.DateField()),
                ('nationality', models.CharField(max_length=50)),
                ('profile_picture', models.ImageField(upload_to='profile_pictures/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='manager_profile', to='myapp.user')),
            ],
        ),
    ]
