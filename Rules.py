import tkinter as tk

#Création de la classe qui permet d'afficher les règles
class Rules:
    def __init__(self, homepage):
        self.homepage_window = homepage
        #On créer la fenêtre
        self.rulesWindow = tk.Tk()
        self.rulesWindow.title('Règlement')
        self.rulesWindow.state('zoomed')

        #Ajouter un évenement lorsque l'on clique sur la croix pour fermer la page
        self.rulesWindow.protocol("WM_DELETE_WINDOW", self.close)

        #On créer les composants de cette fenêtre
        self.lb_rulesTitle = tk.Label(self.rulesWindow, text="REGLEMENTS")
        self.lb_rulesTxt = tk.Label(self.rulesWindow, text="Le déroulement est simple. Tout d’abord, le Product Owner présente un élément du Product Backlog aux participants, c’est à dire les membres de l’équipe de développement. Il répond aux éventuelles questions. Puis chaque participant – en dehors du Product Owner  - choisit la valeur qui lui semble correspondre à la complexité de la solution à mettre en oeuvre. On considère que la complexité est directement liée à la charge de travail. Pour y parvenir, il va comparer cette complexité à un élément étalon auquel on a attribué au préalable une valeur arbitrairement. Et plus il y a d’éléments estimés, plus l’équipe dispose d’éléments de comparaison pour fiabiliser les estimations.")

        #Puis on ajoute les composants dans la fenêtre
        self.lb_rulesTitle.pack()
        self.lb_rulesTxt.pack()

    def show(self):
        self.rulesWindow.mainloop()

    def close(self):
        self.homepage_window.deiconify()
        self.rulesWindow.destroy()
        