import tkinter as tk
from Game import Game
from Rules import Rules

# Création de la classe qui permet d'afficher la page d'accueil
class HomePage:
    def __init__(self):
        # Paramètre de la fenêtre
        self.HomeWindow = tk.Tk()
        self.HomeWindow.title('Planning Poker')
        #self.HomeWindow.state('zoomed')
        #self.HomeWindow.geometry("800x800")
        self.HomeWindow.configure(bg="gray")


        #Groupes de la fenêtre
        self.f_rules = tk.Frame(self.HomeWindow, background="gray", borderwidth=1, relief="solid")

        # Composants de la fenêtre
        self.lb_title = tk.Label(self.HomeWindow, text="PLANNING POKER",font=("Helvetica", 30, "bold"), foreground="white", background="gray")
        self.bt_startANewGame = tk.Button(self.HomeWindow, text="Nouvelle partie", command=self.clic)


        #NEW GAME
        self.lb_gameTitle = tk.Label(self.HomeWindow, text="Lancer une partie")
        self.lb_nbPlayers = tk.Label(self.HomeWindow, text="Nombre de joueurs : ")
        # Créez la Combobox avec des options prédéfinies
        self.data_nbPlayers = tk.Combobox(self.HomeWindow, values=[1, 2, 3, 4, 5])
        
        # Définissez la valeur par défaut
        self.data_nbPlayers.set(1)

        self.lb_difficulty = tk.Label(self.HomeWindow, text="Difficulté")



        #RULES
        self.lb_rulesTitle = tk.Label(self.f_rules, font = ("Helvetica", 20), foreground="red",text="REGLEMENTS", background="gray")
        self.lb_rulesTxt = tk.Label(self.f_rules, font = ("Helvetica", 10), wraplength = 800, text="Le planning poker permet d'estimer la difficulté des différentes tâches à effectuer dans un projet.Le product Owner doit présenter la tâche ou la fonctionnalité à estimer.Chaque joueur reçoit un esemble de cartes numérotées (suite de fibo).Chacun choisit secrètement une carte représentant son estimation de la complexité de la tache.Les cartes sont révélées en même temps. Les joueurs ayant la difficulté la plus et la moins élévée discutes et donne leur point de vu.Le processus se repète jusqu'à ce que tous les joueurs obtiennent la même estimation.", background="gray")

        self.lb_easyRulesTitle = tk.Label(self.f_rules, background="gray", font = ("Helvetica", 15),text = "Règles simples")
        self.lb_easyRulesTxt = tk.Label(self.f_rules,background="gray",  wraplength = 200, text="Pas de limite de temps")

        self.lb_midRulesTitle = tk.Label(self.f_rules, font = ("Helvetica", 15), background="gray",  text = "Règles moyennement strictes")
        self.lb_midRulesTxt = tk.Label(self.f_rules, wraplength = 200, background="gray", text="Chaque joueur possède 1 minute pour jouer un tour.")

        self.lb_strictRulesTitle = tk.Label(self.f_rules, font = ("Helvetica", 15),background="gray", text = "Règles strictes")
        self.lb_strictRulesTxt = tk.Label(self.f_rules, wraplength = 200, background="gray", text="Chaque joueur possède 15 secondes pour jouer un tour. S'il ne joue pas, il est exclu de la partie")

        # Ajout des composant à la fenêtre
        self.lb_title.pack()
        self.bt_startANewGame.pack()

        #Puis on ajoute les composants dans la fenêtre
        self.lb_gameTitle.pack()
        self.lb_nbPlayers.pack()
        self.data_nbPlayers.pack()

        self.f_rules.pack()

        #Rules
        self.lb_rulesTitle.grid(row=0, column=1)
        self.lb_rulesTxt.grid(row=1, column=1)

        self.lb_easyRulesTitle.grid(row=2, column=0)
        self.lb_easyRulesTxt.grid(row=3, column=0)

        self.lb_midRulesTitle.grid(row=2, column=1)
        self.lb_midRulesTxt.grid(row=3, column=1)

        self.lb_strictRulesTitle.grid(row=2, column=2)
        self.lb_strictRulesTxt.grid(row=3, column=2)


    def show(self):
        self.HomeWindow.mainloop()

    def clic(self):
        self.newGame()

    def close(self):
        self.HomeWindow.withdraw()

    def newGame(self):
        self.close()
        gameWindow = Game(self.HomeWindow)
        gameWindow.show()
