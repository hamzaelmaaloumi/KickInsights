import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
from datetime import datetime
import sys
import os
import django
from datetime import datetime
from myapp.dal import OpponentDao



@staticmethod
def getAllOponents():
    try:
        opponents = OpponentDao.getAllOpponents()
        return opponents  
    except Exception as e:
        print(f"service says {e}")

    
@staticmethod
def scrap_Opponent_stats(x):
    OpponentDao.clear_attacking()
    OpponentDao.clear_defending()
    OpponentDao.clear_passing()
    OpponentDao.clear_summary()
    OpponentDao.clear_other()
    OpponentDao.clear_opponent()
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = "C:\\chromedriver-win64\\chromedriver.exe"
    service = Service(path)

    options = Options()
    #options.add_argument('--headless')  # Run in headless mode
    options.add_argument('--disable-gpu')  # Disable GPU acceleration
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--disable-blink-features=AutomationControlled')  # Prevent detection
    options.add_experimental_option("excludeSwitches", ["enable-automation"]) 
    options.add_argument("--log-level=3")  # Suppress logs: 0=ALL, 1=DEBUG, 2=INFO, 3=WARNING
    options.add_experimental_option("excludeSwitches", ["enable-logging"])  # Exclude unnecessary logs


    try:
        driver = webdriver.Chrome(service=service, options=options)
        driver.set_window_size(800,5000)
        website = 'https://www.sofascore.com/en-us/team/football/morocco/4778'
        driver.get(website)

        Opponent = {}
        

        #-----------------------getting into the results tab-----------------------
        close_button = WebDriverWait(driver, 4).until( 
            EC.presence_of_element_located((By.XPATH, '//button[@class="Button RVwfR"]'))
        )
        """ close_button = WebDriverWait(driver, 20).until( 
            EC.element_to_be_clickable((By.XPATH, '//button[@class="Button RVwfR"]'))
        ) """
        close_button.click()

        match_button = WebDriverWait(driver, 4).until(
            EC.element_to_be_clickable((By.XPATH, '//a[@href="#tab:matches"]'))
        )
        match_button.click()
        #-----------------------getting into the fixtures tab-----------------------



        next_matches = driver.find_elements(By.XPATH, '//div[@class="Box klGMtt"]')
        for i in range(4,x+4):
            next_matches = driver.find_elements(By.XPATH, '//div[@class="Box klGMtt"]')
            next_match = next_matches[i]   #matches starting from index 4 -> up
            match_date = next_match.find_element(By.XPATH, './/bdi[contains(@color, "onSurface.nLv3")][@data-testid="event_time"]').text
            match_hour = next_match.find_element(By.XPATH, './/bdi[contains(@color, "onSurface.nLv3")][@class="Text kkVniA"]').text

            match_date = datetime.strptime(match_date, "%m/%d/%y").date()  # Output: 2025-03-20
            match_hour = datetime.strptime(match_hour, "%I:%M %p").time()  # Output: 21:00:00

            Opponent["fixture_date"] = match_date
            Opponent["fixture_time"] = match_hour

            next_match.click()

            oponents = WebDriverWait(driver,4).until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[contains(@class, "Box lfqAOf")]'))
            )
            if oponents[0].find_element(By.XPATH, './/bdi[contains(@class, "Text fIvzGZ")]').text == "Morocco":
                aimed_oponent = oponents[1]
            else:
                aimed_oponent = oponents[0]
            
            time.sleep(2) # waiting for the image the be fully loaded
            aimed_oponent_image_src = aimed_oponent.find_element(By.XPATH, './/img[contains(@class, "Img jmRURX")]').get_attribute("src")
            aimed_oponent_name = aimed_oponent.find_element(By.XPATH, './/bdi[contains(@class, "Text fIvzGZ")]').text

            defaut_image_src = "https://www.sofascore.com/static/images/placeholders/team.svg"
            while aimed_oponent_image_src == defaut_image_src:
                time.sleep(2)
                aimed_oponent_image_src = aimed_oponent.find_element(By.XPATH, './/img[contains(@class, "Img jmRURX")]').get_attribute("src")

            Opponent["name"] = aimed_oponent_name
            Opponent["image"] = aimed_oponent_image_src

            aimed_oponent.click()
            time.sleep(15) # turn it to 15s if a problem happen
            #skip some popus
            expected_popup_1 = driver.find_elements(By.XPATH, "//li[@class='sc-d9e2068a-2 ibVdwD']")
            if len(expected_popup_1) != 0:
                    expected_popup_1[1].click()
            try:
                expected_popup_2 = driver.find_element(By.XPATH, '//button[@class="Button gTStrj"]')
                expected_popup_2.click()
            except:
                pass

            tabs = WebDriverWait(driver, 5).until(
                EC.visibility_of_all_elements_located((By.XPATH, '//a[contains(@style, "color: inherit;")]'))
            )

            while len(tabs) != 6:
                time.sleep(2)
                tabs = WebDriverWait(driver, 5).until(
                    EC.visibility_of_all_elements_located((By.XPATH, '//a[contains(@style, "color: inherit;")]'))
                )
            stats_tab = tabs[5]
            stats_tab.click()


            stats = WebDriverWait(driver, 5).until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="bg_surface.s1 md:bg_surface.s2 br_lg md:br_lg elevation_2 md:elevation_none pos_relative"]'))
            )
            while len(stats) != 6:
                time.sleep(2)
                stats = WebDriverWait(driver, 5).until(
                    EC.presence_of_all_elements_located((By.XPATH, '//div[@class="bg_surface.s1 md:bg_surface.s2 br_lg md:br_lg elevation_2 md:elevation_none pos_relative"]'))
                )
            print(f"stats has {len(stats)} elements")

            print("start waiting")
            time.sleep(5)
            print("finished waiting")

            stats = WebDriverWait(driver, 5).until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="bg_surface.s1 md:bg_surface.s2 br_lg md:br_lg elevation_2 md:elevation_none pos_relative"]'))
            )
            # Summary section
            summary = stats[1]  # Summary is open by default
            driver.execute_script("arguments[0].scrollIntoView(true);", summary)
            summary_stats = {
                "matches": convert("Matches", summary.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Matches")]/span[2]').text),
                "goals_scored": convert("Goals scored", summary.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goals scored")]/span[2]').text),
                "goals_conceded": convert("Goals conceded", summary.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goals conceded")]/span[2]').text),
                "assists": convert("Assists", summary.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Assists")]/span[2]').text)
            }
            print("-----------------------------------------------------------------------------------------------")
            print("-----------------------------------------------------------------------------------------------")
            print(summary_stats)
            summary = OpponentDao.add_summary(summary_stats)
            print("-----------------------------------------------------------------------------------------------")
            print("-----------------------------------------------------------------------------------------------")

            driver.execute_script("window.scrollBy(0, 130);")
            time.sleep(1)

            # Attacking section
            attacking = stats[2]
            attacking.click()
            time.sleep(3)
            attacking_stats = {
                "goals_per_game": convert("Goals per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goals per game")]/span[2]').text),
                "left_foot_goals": convert("Left foot goals", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Left foot goals")]/span[2]').text),
                "right_foot_goals": convert("Right foot goals", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Right foot goals")]/span[2]').text),
                "headed_goals": convert("Headed goals", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Headed goals")]/span[2]').text),
                "big_chances_per_game": convert("Big chances per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Big chances per game")]/span[2]').text),
                "big_chances_missed_per_game": convert("Big chances missed per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Big chances missed per game")]/span[2]').text),
                "total_shots_per_game": convert("Total shots per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Total shots per game")]/span[2]').text),
                "shots_on_target_per_game": convert("Shots on target per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Shots on target per game")]/span[2]').text),
                "shots_off_target_per_game": convert("Shots off target per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Shots off target per game")]/span[2]').text),
                "blocked_shots_per_game": convert("Blocked shots per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Blocked shots per game")]/span[2]').text),
                "successful_dribbles_per_game": convert("Succ. dribbles per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Succ. dribbles per game")]/span[2]').text),
                "corners_per_game": convert("Corners per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Corners per game")]/span[2]').text),
                "free_kicks_per_game": convert("Free kicks per game", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Free kicks per game")]/span[2]').text),
                "hit_woodwork": convert("Hit woodwork", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Hit woodwork")]/span[2]').text),
                "counter_attacks": convert("Counter attacks", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Counter attacks")]/span[2]').text)
            }
            attacking_stats.update(convert("Penalty goals", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Penalty goals")]/span[2]').text))
            attacking_stats.update(convert("Free kick goals", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Free kick goals")]/span[2]').text))
            attacking_stats.update(convert("Goals from inside the box", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goals from inside the box")]/span[2]').text))
            attacking_stats.update(convert("Goals from outside the box", attacking.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goals from outside the box")]/span[2]').text))
            print(attacking_stats)
            attacking = OpponentDao.add_attacking(attacking_stats)
            print("-----------------------------------------------------------------------------------------------")
            print("-----------------------------------------------------------------------------------------------")

            driver.execute_script("window.scrollBy(0, 100);")
            time.sleep(1)

            # Passes section
            passes = stats[3]
            passes.click()
            time.sleep(3)
            passes_stats = {
                "ball_possession_percentage": convert("ball_possession_percentage", passes.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Ball possession")]/span[2]').text)["ball_possession"],
                **convert("Accurate per game", passes.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Accurate per game")]/span[2]').text),
                **convert("Acc. own half", passes.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Acc. own half")]/span[2]').text),
                **convert("Acc. opposition half", passes.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Acc. opposition half")]/span[2]').text),
                **convert("Acc. long balls", passes.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Acc. long balls")]/span[2]').text),
                **convert("Acc. crosses", passes.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Acc. crosses")]/span[2]').text)
            }
            print(passes_stats)
            passing = OpponentDao.add_passing(passes_stats)
            print("-----------------------------------------------------------------------------------------------")
            print("-----------------------------------------------------------------------------------------------")

            driver.execute_script("window.scrollBy(0, 100);")
            time.sleep(1)

            # Defending section
            defending = stats[4]
            defending.click()
            time.sleep(3)
            defending_stats = {
                "clean_sheets": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Clean sheets")]/span[2]').text),
                "goals_conceded_per_game": float(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goals conceded per game")]/span[2]').text),
                "tackles_per_game": float(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Tackles per game")]/span[2]').text),
                "interceptions_per_game": float(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Interceptions per game")]/span[2]').text),
                "clearances_per_game": float(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Clearances per game")]/span[2]').text),
                "saves_per_game": float(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Saves per game")]/span[2]').text),
                "balls_recovered_per_game": float(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Balls recovered per game")]/span[2]').text),
                "errors_leading_to_shot": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Errors leading to shot")]/span[2]').text),
                "errors_leading_to_goal": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Errors leading to goal")]/span[2]').text),
                "penalties_committed": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Penalties committed")]/span[2]').text),
                "penalty_goals_conceded": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Penalty goals conceded")]/span[2]').text),
                "clearance_off_line": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Clearance off line")]/span[2]').text),
                "last_man_tackle": int(defending.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Last man tackle")]/span[2]').text)
            }
            print(defending_stats)
            defending = OpponentDao.add_defending(defending_stats)
            print("-----------------------------------------------------------------------------------------------")
            print("-----------------------------------------------------------------------------------------------")

            #driver.execute_script("window.scrollBy(0, 60);")
            #time.sleep(4)

            # Other section
            other = stats[5]
            other.click()
            time.sleep(3)
            other_stats = {
                "possession_lost_per_game": convert("Possession lost per game", other.find_element(By.XPATH, '//div[contains(@class, "Box") and contains(., "Possession lost per game")]/span[2]').text),
                "throw_ins_per_game": convert("Throw-ins per game", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Throw-ins per game")]/span[2]').text),
                "goal_kicks_per_game": convert("Goal kicks per game", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Goal kicks per game")]/span[2]').text),
                "offsides_per_game": convert("Offsides per game", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Offsides per game")]/span[2]').text),
                "fouls_per_game": convert("Fouls per game", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Fouls per game")]/span[2]').text),
                "yellow_cards_per_game": convert("Yellow cards per game", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Yellow cards per game")]/span[2]').text),
                "red_cards": convert("Red cards", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Red cards")]/span[2]').text)
            }
            other_stats.update(convert("Duels won per game", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Duels won per game")]/span[2]').text))
            other_stats.update(convert("Ground duels won", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Ground duels won")]/span[2]').text))
            other_stats.update(convert("Aerial duels won", other.find_element(By.XPATH, './/div[contains(@class, "Box") and contains(., "Aerial duels won")]/span[2]').text))
            print(other_stats)
            other = OpponentDao.add_other(other_stats)
            print("-----------------------------------------------------------------------------------------------")
            print("-----------------------------------------------------------------------------------------------")

            driver.back()
            time.sleep(5)
            driver.back()
            time.sleep(5)
            expected_popup_1 = driver.find_elements(By.XPATH, "//li[@class='sc-d9e2068a-2 ibVdwD']")
            if len(expected_popup_1) != 0:
                    expected_popup_1[1].click()
            try:
                expected_popup_2 = driver.find_element(By.XPATH, '//button[@class="Button gTStrj"]')
                expected_popup_2.click()
            except:
                pass

            Opponent["summary"] = summary.id
            Opponent["attacking"] = attacking.id
            Opponent["passes"] = passing.id
            Opponent["defending"] = defending.id
            Opponent["other"] = other.id

            print(Opponent)

            OpponentDao.add_Opponent(Opponent)



        print("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅")
        driver.quit()
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌")
        print(f"an error happend {e}")
        driver.quit()
        raise e

















def convert(stat_name, text):
    try:
        integer_stats = [
            "Matches", "Goals scored", "Goals conceded", "Assists",
            "Left foot goals", "Right foot goals", "Headed goals", "Hit woodwork",
            "Counter attacks", "Clean sheets", "Errors leading to shot", "Errors leading to goal",
            "Penalties committed", "Penalty goals conceded", "Clearance off line",
            "Last man tackle", "Red cards"
        ]
        if stat_name in integer_stats:
            return int(text)

        #decimal stats, convert them to float
        decimal_stats = [ 
            "Goals per game", "Big chances per game", "Big chances missed per game",
            "Total shots per game", "Shots on target per game", "Shots off target per game",
            "Blocked shots per game", "Succ. dribbles per game", "Corners per game",
            "Free kicks per game", "Goal kicks per game", "Goals conceded per game", "Tackles per game",
            "Interceptions per game", "Clearances per game", "Saves per game",
            "Balls recovered per game", "Possession lost per game", "Throw-ins per game",
            "Offsides per game", "Fouls per game", "Yellow cards per game"
        ]
        if stat_name in decimal_stats:
            return float(text)




        # Percentage only stats, remove %
        if stat_name == "ball_possession_percentage":
            percentage = text.strip('%')
            return {
                "ball_possession": float(percentage)
            }

        # Scored/attempted format (e.g., "0/3"), split them into 2 values
        if stat_name == "Penalty goals":
            if '/' in text:
                scored, attempted = text.split('/')
                return {
                    "penalty_goals_scored": int(scored),
                    "penalty_goals_attempted": int(attempted)
                }
            else:
                return {
                    "penalty_goals_scored": int(text),
                    "penalty_goals_attempted": int(text)
                }
        if stat_name == "Free kick goals":
            scored, attempted = text.split('/')
            return {
                "free_kick_goals_scored": int(scored),
                "free_kick_goals_attempted": int(attempted)
            }
        elif stat_name == "Goals from inside the box":
            scored, attempted = text.split('/')
            return {
                "goals_inside_box_scored": int(scored),
                "goals_inside_box_attempted": int(attempted)
            }
        elif stat_name == "Goals from outside the box":
            scored, attempted = text.split('/')
            return {
                "goals_outside_box_scored": int(scored),
                "goals_outside_box_attempted": int(attempted)
            }

        # Number (percentage%) format (e.g., "299 (78.7%)"), split them into 2 values
        number_percentage_stats = {
            "Accurate per game": ("accurate_passes", "accurate_passes_percentage", int),
            "Acc. own half": ("acc_own_half", "acc_own_half_percentage", int),
            "Acc. opposition half": ("acc_opposition_half", "acc_opposition_half_percentage", int),
            "Acc. long balls": ("acc_long_balls", "acc_long_balls_percentage", float),
            "Acc. crosses": ("acc_crosses", "acc_crosses_percentage", float),
            "Duels won per game": ("duels_won_per_game", "duels_won_percentage", float),
            "Ground duels won": ("ground_duels_won", "ground_duels_won_percentage", float),
            "Aerial duels won": ("aerial_duels_won", "aerial_duels_won_percentage", float)
        }
        if stat_name in number_percentage_stats:
            number, percentage = text.split('(')
            number = number.strip()
            percentage = float(percentage.strip('%)'))
            field_name, percentage_field, number_type = number_percentage_stats[stat_name]
            return {
                field_name: number_type(number),
                percentage_field: percentage
            }
    except Exception as e:
        raise ValueError(f"Unknown stat name: {stat_name}, ther is the problem: {e}")








""" and keep in mind that If the stat is a percentage (e.g., "46.7%"), convert it to a decimal (0.467).
If the stat has both a raw number and a percentage (e.g., "299 (78.7%)") store both values separately
 in your database and if the stat is pure decimal keep it as it is """