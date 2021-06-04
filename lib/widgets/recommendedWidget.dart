
  import 'package:flutter/material.dart';

Container recommendedWidget(int index) {
    return Container(
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
                      );
  }
