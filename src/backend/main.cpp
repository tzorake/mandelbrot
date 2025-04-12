#include <iostream>
#include <vector>

#define wasm_export(name) __attribute__((used, visibility("default"), export_name(name)))

extern "C" {

int canvasWidth = 0;
int canvasHeight = 0;

std::vector<int> canvasPixels;

enum Space : int {
    PARAMETER_SPACE,
    DYNAMIC_SPACE,
};

double realPart = 0.0;
double imagPart = 0.0;
double escapeRadiusSquared = 0.0;
int maximumIterations = 0;
int step = 0;
int detailLevel = 0;
int maximumDetailLevel = 0;
Space space = Space::PARAMETER_SPACE;

double translationX = 0.0;
double translationY = 0.0;
double zoom = 0.0;
double rotation = 0.0;

wasm_export("setSize")
void setSize(int width, int height) {
    canvasWidth = width;
    canvasHeight = height;
    int requiredSize = canvasWidth * canvasHeight;
    if (requiredSize > canvasPixels.size())
        canvasPixels.resize(requiredSize);
}

wasm_export("setRealPart")
void setRealPart(double value) {
    realPart = value;
}

wasm_export("setImagPart")
void setImagPart(double value) {
    imagPart = value;
}

wasm_export("setEscapeRadiusSquared")
void setEscapeRadiusSquared(double value) {
    escapeRadiusSquared = value;
}

wasm_export("setMaximumIterations")
void setMaximumIterations(int value) {
    maximumIterations = value;
}

wasm_export("setStep")
void setStep(int value) {
    step = value;
}

wasm_export("setDetailLevel")
void setDetailLevel(int value) {
    detailLevel = value;
}

wasm_export("setMaximumDetailLevel")
void setMaximumDetailLevel(int value) {
    maximumDetailLevel = value;
}

wasm_export("setSpace")
void setSpace(int value) {
    space = static_cast<Space>(value);
}

wasm_export("setTranslationX")
void setTranslationX(double value) {
    translationX = value;
}

wasm_export("setTranslationY")
void setTranslationY(double value) {
    translationY = value;
}

wasm_export("setZoom")
void setZoom(double value) {
    zoom = value;
}

wasm_export("setRotation")
void setRotation(double value) {
    rotation = value;
}

wasm_export("pixelsPtr")
int *pixelsPtr() {
    return canvasPixels.data();
}

wasm_export("pixelsLen")
int pixelsLen() {
    return canvasWidth * canvasHeight;
}

extern int tzjs_interpolate(double value);

struct MandelbrotResult {
    int iter; 
    double l;
};

MandelbrotResult mandelbrotImpl(double zx, double zy, double cx, double cy) {
    int iter = 0;
    double l = zx * zx + zy * zy;

    while (l < escapeRadiusSquared && iter < maximumIterations) {
        double newZx = zx * zx - zy * zy + cx;
        double newZy = 2 * zx * zy + cy;
        zx = newZx;
        zy = newZy;
        l = zx * zx + zy * zy;
        iter++;
    }

    return { iter, l };
}

MandelbrotResult mandelbrot(double zx, double zy, double cx, double cy) {
    return space == Space::PARAMETER_SPACE
        ? mandelbrotImpl(zx, zy, cx, cy)
        : mandelbrotImpl(cx, cy, zx, zy);
}

const double _LOG_2 = std::log(2.0);
const double _2_LOG_2 = 2 * _LOG_2;

double smooth(int iter, double l) {
    if (iter < maximumIterations) {
        double nu = std::log(std::log(l) / _2_LOG_2) / _LOG_2;
        return (iter + 1 - nu) / maximumIterations;
    }

    return 1.0;
}

wasm_export("compute")
bool compute() {
    if (canvasWidth <= 0 || canvasHeight <= 0) {
        return false;
    }

    int cx = canvasWidth / 2;
    int cy = canvasHeight / 2;

    double C = std::cos(rotation);
    double S = std::sin(rotation);
    double V = zoom;
    double X1 = translationX;
    double Y1 = translationY;
    double X2 = -cx;
    double Y2 = -cy;
    
    for (int y = 0; y < canvasHeight; y += step) {
        for (int x = 0; x < canvasWidth; x += step) {
            auto [iter, l] = mandelbrot(
                realPart,
                imagPart,
                C * V * x - V * S * y + C * V * X2 - V * S * Y2 + X1,
                V * S * x + C * V * y + V * S * X2 + C * V * Y2 + Y1
            );
            double value = smooth(iter, l);
            int color = tzjs_interpolate(value);
            for (int dy = 0; dy < step && y + dy < canvasHeight; ++dy) {
                for (int dx = 0; dx < step && x + dx < canvasWidth; ++dx) {
                    int index = ((y + dy) * canvasWidth + (x + dx)); 
                    canvasPixels[index] = color;
                }
            }
        }
    }

    return true;
}

wasm_export("main") 
int main(int argc, char* argv[]) {
    return 0;
}

} // extern "C"

