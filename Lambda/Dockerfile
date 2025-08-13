FROM public.ecr.aws/lambda/python:3.12

# Install OS packages for Pillow-SIMD
RUN dnf -y install libtiff-devel libjpeg-devel openjpeg2-devel zlib-devel \
    freetype-devel lcms2-devel libwebp-devel tcl-devel tk-devel \
    harfbuzz-devel fribidi-devel libraqm-devel libimagequant-devel libxcb-devel \
    make gcc \
    && dnf clean all

# Copy the earlier created requirements.txt file to the container
COPY requirements.txt ./

RUN python3.12 -m pip install -r requirements.txt
RUN pip uninstall -y pillow && CC="cc -mavx2" pip install -U --force-reinstall pillow-simd

COPY app.py ${LAMBDA_TASK_ROOT}
COPY exported_model ./exported_model

ENV AWS_LAMBDA_FUNCTION_TIMEOUT=840
CMD ["app.lambda_handler"]