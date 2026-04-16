

what is ml
So machine learning is a subject of artificial intelligence Which lets computer our machine learn on its own without explicitly coding it to do so.


Some keywords :
hypothesis : rules and believes that a model make to process the input.
Hypothesis space : All the possible hypotheses that a model can have.
		For example
		If a model can draw straight lines then
		Set of all the possible straight lines would be the hypothesis space of the model.
		Complex models have larger hypothesis space.
			- **Finite Hypothesis Space:** The data features are discrete (e.g., Weather is either Sunny, Overcast, or Rain). Because the options are limited, there is a fixed, countable number of possible rules the model can make.
			- **Infinite Hypothesis Space:** The data features are continuous (e.g., Weight is 45.2 kg, 45.21 kg, etc.). You could draw an infinite number of dividing lines, meaning infinite possible rules. (This is where VC Dimension comes in, to measure the capacity of these infinite spaces).
Version Space : Version space This is the sweet spot for the model
		It contain all the hypothesis.
		that have not been proven wrong yet.
		#added 	Version Space is bounded by the most general hypothesis and the most specific hypothesis


[[Find S algo]] : most specific hypo and completely ignore negetive hypo
[[Candidate elimination]]
	You track two boundaries:
- **S (Specific Boundary):** Starts at ⟨Ø,Ø,Ø⟩. Moves "up" to become more general.
- **G (General Boundary):** Starts at ⟨?,?,?⟩. Moves "down" to become more specific.

[[Issues in ML]]


#added 
PAC Learning (Probably Approximately Correct)
		PAC learning is a mathematical framework that proves a machine learning algorithm will output a hypothesis that is **Probably** (with high probability) **Approximately Correct** (has a low error rate) given enough training data. It's used to calculate the "sample complexity" (how much data you need).


There are three types of machine learning.

First to supervised learning.


1. bayes theorem.
	1. Provides formula for the hypothesis probability if an event happened.
2. Nieve Bayes:
	1. Relies on probability rather than plain yes or no.
	2. My bias assumes that there is no relation between the columns or between the data points
	3. Very simple formula for determining the probability.
	4. probability of a hypothesis being true such that an event E occur
	5. P(h/e) = P(e/h)*p(e)/ P(e)

1. dicision trees :
	1. Decision trees Ask a set of questions with answers yes or no.
	2. On the basis of that, they make their hypothesis.
	3. The goal is to reduce entropy in the data set.
	4. The first question asked is The best question is that reduce more entropy
	5. entropy formula How much is the entropy of the data set?
	6. gain formulaWhich question reduce how much entropy?
	7. The formal term for "reducing entropy" is **Information Gain**.
	- _Expansion:_ The root of the tree is the attribute with the highest Information Gain.

2. Support vector machine.
	1. makes a gap or a wide street between the data points.
	2. #wrong Support vector is a distance between the plane and the closest data point.
	3. The Support Vectors are the actual _data points_ that sit closest to the dividing line. 
	4. The distance itself is called the **Margin**.
	5. dimension of the plane can be increased if the data points require more dimension
	6. The plane that separates the data points is called hyperplane
		1. #added _Expansion:_ To stretch your answer, mention the **Kernel Trick**. If data can't be separated by a flat line in 2D, SVM uses a Kernel Function (like Polynomial or RBF) to bend the space into 3D where a Hyperplane can separate it.
3. Neural network.
	1. Perceptron is the smallest unit of neural network or it is also called a single neuron.
	2. In neural network for every perceptor has its own bias and weight.
	3. For a question, every neuron votes yes or no
	4. Yes or no it decided by a formula which also have a activation function
	5. This is based on the probability of yes and no.
	6. #added An MLP is simply a network with "Hidden Layers" situated between the input and output layers. This allows the network to solve complex, non-linear problems (like the XOR problem) that a single perceptron cannot solve.
	7. Output of a neuron is calculated by this formula. Output=Activation(∑(Weight×Input)+Bias)
	8. A neuron can learn By changing its weights through this formula.
		1. Wnew​=W+N(target−output)X
		2. Where X is the input
		3. And the the rate of learning?
		4. W is previous weight
		5. Wnew is new weigth
4. KNN
	1. This is called lazy algorithm.
	2. And this distance from every point is calculated to the new point added to the data set.
	3. And the answer is vo to the vote or average of K nearest neighbors
	4. This can be very time consuming for larger data sets.
5. Linear regression and logistic regression
	1. Linear regression draws a straight line from the data set which have the least amount of error or the distance between palms and the lines
	2. This line helps in predicting other data points.
	3. Formula for the line is Y equals to mx plus c
	4. Example
	5. Logistic regression is a classification problem in which
	6. Values are passed through a #wrong  sinusoidal function it uses Sigmoid function
	7. Which give output as zero or one
	8.  For example, if a email is a spam or not.



Ensemble learning
Boosting and bagging, two types of algorithm.
1. AdaBoost
	1. multiple Model are trained on trees in series
	2. And the goal is to learn from the mistakes of previous tree and improve in the next iteration.
	3. This reduces under fitting in the data set. reduces underfitting (bias).
	4. example : 
2. Random forest.
	1. Multiple trees are trained in parallel reduces overfitting (variance).
	2. And then output of those are combined into a single output of the model.
	3. This is done either by taking average or by voting.
	4. example : heavily used in medical related models


Unsupervised learning.
When the model is trained on unlabeled data.
It means answer to the input is not given
so the model have two make out hidden patterns and the relation between the data points.


Don't know why and how these theorem come into unprovide learning.
Types of unsupervised learning.
1. clustering
	- _Correction:_ You wrote "line is drawn from between those data sets". **Wrong.** There are no lines drawn in K-Means.
    
	- _The actual steps:_ 
	1. Drop K random points (called Centroids) onto the graph. 
	2. Calculate the distance from every single data point to the Centroids. 
	3. Group each point with its closest Centroid. 
	4. Move the Centroid to the exact mathematical center (mean) of its new group. 
	5. Repeat until the Centroids stop moving.
2. Association.
	1. relations are discovered between the data points
	2. Simple if this then this kind of relations are formed between the data points.
	3. One of the famous example is the beer and diaper case in supermarket customer behaviour analysis.
	4. A algorithm is a Appori algo in which
		1. We have multiple sets of elements
		2. We count frequency of elements in total.
		3. Then elements with frequency lower than the cutoff are removed.
		4. Then we form paris of the groups elements to cover every possible pair
		5. Then we count the frequency of the groups
		6. Then similarly we remove the groups which have frequency lower than the cutoff
		7. And this is repeated until there is a single group left.
	5. Better **FP-Growth Algorithm** (Frequent Pattern Growth)
		1. This algorithm require only two iterations from the data set to give us the answer.
		2. In this we sort every set on the basis of something.
		3. And similarly we count the number of elements in the frequency in the sets.
		4. A tree kind of structure is formed by the groups
		5. Based on that data structure we further eliminate the groups having lower frequency
3. Dimensionality reduction.
	1. Dimension of the data set is reduced
	2. not much idea about this



[[Issues in ML]]
[[Find S algo]]
[[Candidate elimination]]

