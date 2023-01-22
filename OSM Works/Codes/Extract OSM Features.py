import matplotlib
import networkx as nx
import osmnx as ox


# download/model a street network for some city then visualize it
G = ox.graph_from_place("Nairobi, Kenya", network_type="drive")

# convert your MultiDiGraph to an undirected MultiGraph
M = nx.MultiGraph(G.to_undirected())
# check if the graph is directed
print(nx.is_directed(M))

fig, ax = ox.plot_graph(M)
