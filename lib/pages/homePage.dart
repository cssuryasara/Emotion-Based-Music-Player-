import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:marquee/marquee.dart';

class HomePage extends StatelessWidget {
  HomePage({Key? key}) : super(key: key);
  String greeting() {
    var hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Morning';
    }
    if (hour < 17) {
      return 'Afternoon';
    }
    return 'Evening';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Good ${greeting()}',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height / 3.5,
                    child: GridView.count(
                      physics: NeverScrollableScrollPhysics(),
                      childAspectRatio: 3 / 1,
                      crossAxisCount: 2,
                      mainAxisSpacing: 10,
                      crossAxisSpacing: 10,
                      children: List.generate(
                        6,
                        (index) => Container(
                          color: Colors.black38,
                          child: Row(
                            children: [
                              Expanded(
                                flex: 1,
                                child: CachedNetworkImage(
                                  placeholder: (context, url) =>
                                      CircularProgressIndicator(),
                                  errorWidget: (context, url, error) =>
                                      new Icon(Icons.error),
                                  imageUrl:
                                      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
                                  imageBuilder: (context, imageProvider) {
                                    // you can access to imageProvider
                                    return Container(
                                      alignment: Alignment.center,
                                      decoration: BoxDecoration(
                                        image: DecorationImage(
                                          fit: BoxFit.cover,
                                          image: imageProvider,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                              Expanded(
                                flex: 2,
                                child: Padding(
                                  padding: EdgeInsets.all(4),
                                  child: Text('NAME'),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Text(
                    'Recently Played',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height / 6,
                    child: ListView.builder(
                      itemCount: 10,
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (BuildContext context, int index) => Padding(
                        padding: EdgeInsets.all(4.0),
                        child: Container(
                          width: 120,
                          child: Column(
                            crossAxisAlignment: index % 2 == 0
                                ? CrossAxisAlignment.center
                                : CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: CachedNetworkImage(
                                  placeholder: (context, url) =>
                                      CircularProgressIndicator(),
                                  errorWidget: (context, url, error) =>
                                      new Icon(Icons.error),
                                  imageUrl:
                                      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
                                  imageBuilder: (context, imageProvider) {
                                    // you can access to imageProvider
                                    return Container(
                                      alignment: Alignment.center,
                                      decoration: BoxDecoration(
                                        image: DecorationImage(
                                          fit: BoxFit.cover,
                                          image: imageProvider,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ),
                              Text(
                                'sdhghjsg',
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Text(
                    'Recommended',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height / 6,
                    child: ListView.builder(
                      itemCount: 10,
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (BuildContext context, int index) => Padding(
                        padding: EdgeInsets.all(4.0),
                        child: Container(
                          width: 120,
                          child: Column(
                            crossAxisAlignment: index % 2 == 0
                                ? CrossAxisAlignment.center
                                : CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Container(
                                  decoration: BoxDecoration(
                                    borderRadius: index % 2 == 0
                                        ? BorderRadius.circular(500)
                                        : BorderRadius.circular(0),
                                    image: DecorationImage(
                                      fit: BoxFit.cover,
                                      alignment: Alignment.center,
                                      image: NetworkImage(
                                        'https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Text(
                                'sdhghjsg',
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Text(
                    'Recommended',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height / 6,
                    child: ListView.builder(
                      itemCount: 10,
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (BuildContext context, int index) => Padding(
                        padding: EdgeInsets.all(4.0),
                        child: Container(
                          width: 120,
                          child: Column(
                            crossAxisAlignment: index % 2 == 0
                                ? CrossAxisAlignment.center
                                : CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Container(
                                  decoration: BoxDecoration(
                                    borderRadius: index % 2 == 0
                                        ? BorderRadius.circular(500)
                                        : BorderRadius.circular(0),
                                    image: DecorationImage(
                                      fit: BoxFit.cover,
                                      alignment: Alignment.center,
                                      image: NetworkImage(
                                        'https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Text(
                                'sdhghjsg',
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Text(
                    'Recommended',
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height / 6,
                    child: ListView.builder(
                      itemCount: 10,
                      scrollDirection: Axis.horizontal,
                      itemBuilder: (BuildContext context, int index) => Padding(
                        padding: EdgeInsets.all(4.0),
                        child: Container(
                          width: 120,
                          child: Column(
                            crossAxisAlignment: index % 2 == 0
                                ? CrossAxisAlignment.center
                                : CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Container(
                                  decoration: BoxDecoration(
                                    borderRadius: index % 2 == 0
                                        ? BorderRadius.circular(500)
                                        : BorderRadius.circular(0),
                                    image: DecorationImage(
                                      fit: BoxFit.cover,
                                      alignment: Alignment.center,
                                      image: NetworkImage(
                                        'https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Text(
                                'sdhghjsg',
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              // alignment: Alignment.bottomCenter,
              bottom: 0,
              right: 0,
              child: Container(
                height: MediaQuery.of(context).size.height / 14,
                width: MediaQuery.of(context).size.width,
                color: Theme.of(context).primaryColor,
                child: Row(
                  children: [
                    Expanded(
                      flex: 1,
                      child: CachedNetworkImage(
                                  placeholder: (context, url) =>
                                      CircularProgressIndicator(),
                                  errorWidget: (context, url, error) =>
                                      new Icon(Icons.error),
                                  imageUrl:
                                      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
                                  imageBuilder: (context, imageProvider) {
                                    // you can access to imageProvider
                                    return Container(
                                      alignment: Alignment.center,
                                      decoration: BoxDecoration(
                                        image: DecorationImage(
                                          fit: BoxFit.cover,
                                          image: imageProvider,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                    ),
                    Expanded(
                      flex: 3,
                      child: Marquee(
                        text: 'Some sample text that takes some space.',
                        style: TextStyle(fontWeight: FontWeight.bold),
                        scrollAxis: Axis.horizontal,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        blankSpace: 20.0,
                        velocity: 40.0,
                        pauseAfterRound: Duration(seconds: 1),
                        showFadingOnlyWhenScrolling: true,
                        fadingEdgeStartFraction: 0.1,
                        fadingEdgeEndFraction: 0.1,
                        numberOfRounds: 100,
                        startPadding: 10.0,
                        accelerationDuration: Duration(seconds: 1),
                        accelerationCurve: Curves.linear,
                        decelerationDuration: Duration(milliseconds: 500),
                        decelerationCurve: Curves.easeOut,
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: Icon(Icons.play_arrow),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
