import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'full_screen_image.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Album571',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Album 571'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<XFile> _imagesList = [];
  final List<int> _imageWidth = [];
  final List<int> _imageHeight = [];

  late File _imageFile;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Column(
          children: [
            Expanded(child: Center(child: _buildImage())),
            _buildButtons(),
          ],
        ));
  }

  Widget _buildImage() {
    if (_imagesList.isNotEmpty) {
      return GridView.builder(
        padding: const EdgeInsets.fromLTRB(10, 10, 10, 0),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 5,
          mainAxisSpacing: 5,
        ),
        itemBuilder: (context, index) {
          return RawMaterialButton(
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => FullScreenImage(
                          _imagesList[index].path,
                          _imageWidth[index],
                          _imageHeight[index])));
            },
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(15),
                image: DecorationImage(
                  image: AssetImage(_imagesList[index].path),
                  fit: BoxFit.cover,
                ),
              ),
            ),
          );
        },
        itemCount: _imagesList.length,
      );
    } else {
      return const Text('Take an image to start',
          style: TextStyle(fontSize: 18.0));
    }
  }

  Widget _buildButtons() {
    return ConstrainedBox(
        constraints: const BoxConstraints.expand(height: 80.0),
        child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              _buildActionButton(
                key: const Key('retake'),
                text: 'Photos',
                onPressed: () => captureImage(ImageSource.gallery),
              ),
              _buildActionButton(
                key: const Key('upload'),
                text: 'Camera',
                onPressed: () => captureImage(ImageSource.camera),
              ),
            ]));
  }

  Widget _buildActionButton(
      {required Key key,
      required String text,
      required VoidCallback onPressed}) {
    return Expanded(
      child: TextButton(
        key: key,
        child: Text(
          text,
          style: const TextStyle(fontSize: 20.0, color: Colors.white),
        ),
        style: TextButton.styleFrom(
            backgroundColor: Colors.blueAccent,
            shape: const RoundedRectangleBorder()),
        onPressed: onPressed,
      ),
    );
  }

  Future<void> captureImage(ImageSource imageSource) async {
    try {
      XFile? selectedFile = await ImagePicker().pickImage(source: imageSource);
      if (selectedFile != null) {
        setState(() {
          _imagesList.add(selectedFile);
        });
        _imageFile = File(selectedFile.path);
        var decodedImage =
            await decodeImageFromList(_imageFile.readAsBytesSync());
        _imageWidth.add(decodedImage.width);
        _imageHeight.add(decodedImage.height);
      }
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }
}
