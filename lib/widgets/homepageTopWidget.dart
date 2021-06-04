import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

Widget homePageTopWidget() {
  return Container(
    color: Colors.black38,
    child: Row(
      children: [
        Expanded(
          flex: 1,
          child: CachedNetworkImage(
            placeholder: (context, url) => CircularProgressIndicator(),
            errorWidget: (context, url, error) => new Icon(Icons.error),
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
  );
}
