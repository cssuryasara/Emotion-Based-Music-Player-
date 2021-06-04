import 'package:flutter/material.dart';

class PredictionPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        body: Stack(
          children: [
            TabBarView(
              children: [
                Icon(Icons.flight, size: 350),
                Icon(Icons.directions_transit, size: 350),
              ],
            ),
            Align(
              alignment: Alignment.topCenter,
              child: Container(
                height: 50,
                width: MediaQuery.of(context).size.width,
                child: TabBar(
                  tabs: [
                    Center(
                      child: Text(
                        "MODEL",
                        style: TextStyle(fontSize: 24),
                      ),
                    ),
                    Center(
                      child: Text(
                        "RANDOM",
                        style: TextStyle(fontSize: 24),
                      ),
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
