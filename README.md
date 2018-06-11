# Bates B-Well
From my time in college, I noticed that Bates (and perhaps other schools) could offer their students a more efficient manner to access
information on campus and optimize certain tasks which were reminiscent of non-DRY code in real life. 
Enter 'BatesBWell' which takes its name after the fitness program for faculty and staff on campus called B-Well.
The features comprised in this application are:
* automatic attendance tracker
* dining menu viewer
* athletics schedule viewer
* more regulated version of yik yak specifically for Bates students

As the latter three features are native to Bates, any developers going through this repository will probably find ./src/components/attendance/.... to be most helpful. The basic premise is to allow the leader of a class, like a gym coach or professor, to allow automatically track the attendance of class participants. First a user signs in (authentication handled through firebase) and then if the users latitude/longitude coordinate vector falls within the lattice of coordinates desginated by a certain circular area with a specified radius (Bates Merrill gymnasium in this case), then the program begins a timer. Once the timer reaches 35 minutes, it adds 1 point to the attendance for that specific user on a realtime DB on firebase. A simple FlatList component from RCTNative shows the names and attendance points of all users thus far.

