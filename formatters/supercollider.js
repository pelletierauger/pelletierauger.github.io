module.exports = function(hljs) {
    return {
        keywords: {
            keyword: 'arg var',
            built_in: `
            A2B A2K APF AY AbstractDispatcher AbstractFunction AbstractGroup AbstractIn 
            AbstractMDPlugin AbstractMessageMatcher AbstractNodeWatcher AbstractOpPlug 
            AbstractOut AbstractPlayControl AbstractResponderFunc AbstractScroll 
            AbstractServerAction AbstractStepValue AbstractSystemAction 
            AbstractWrappingDispatcher Allpass1 Allpass2 AllpassC AllpassL 
            AllpassN AmpComp AmpCompA Amplitude AmplitudeMod AnalyseEvents2 
            AppClock Archive Array Array2D ArrayMax ArrayMin ArrayedCollection 
            Association Atk AtkKernelConv AtkMatrixMix AtsAmp AtsBand AtsFile 
            AtsFreq AtsNoiSynth AtsNoise AtsParInfo AtsPartial AtsSynth AtsUGen 
            AttackSlope AudioControl AudioIn AudioMSG AutoTrack AverageOutput 
            B2A B2Ster B2UHJ BAllPass BBandPass BBandStop BBlockerBuf BBlockerProgram 
            BEQSuite BF BFDecode BFDecode1 BFDecoder BFEncode BFEncode1 BFEncode2 
            BFEncodeSter BFFreeVerb BFGVerb BFGrainPanner BFManipulate BFMixer 
            BFMonitor BFPanner BHPF BHiPass BHiPass4 BHiShelf BLBufRd BLPF 
            BLowPass BLowPass4 BLowShelf BMoog BPF BPZ2 BPeakEQ BRF BRZ2 Bag Balance 
            Balance2 Ball BasicNodeWatcher BasicOpUGen BeatStatistics BeatTrack 
            BeatTrack2 BendResponder BhobHiShelf BhobLoShelf BhobTone BiPanB2 BinData 
            BinaryOpFailureError BinaryOpFunction BinaryOpFunctionProxy BinaryOpPlug 
            BinaryOpStream BinaryOpUGen BinaryOpXStream BlankGridLines Blip BlitB3 
            BlitB3Saw BlitB3Square BlitB3Tri BlockSize Boolean Breakcore BrownNoise 
            Brusselator BtoUHJ BufAllpassC BufAllpassL BufAllpassN BufChannels 
            BufCombC BufCombL BufCombN BufDelayC BufDelayL BufDelayN BufDur BufFrames 
            BufGrain BufGrainB BufGrainBBF BufGrainBF BufGrainI BufGrainIBF 
            BufInfoUGenBase BufMax BufMin BufRateScale BufRd BufSampleRate BufSamples 
            BufWr Buffer BundleNetAddr Bus BusPlug BusScopeSynth Button CCResponder 
            COsc CQ_Diff CSVFileReader Case Cepstrum Changed ChaosGen Char CheapVerb 
            CheckBadValues CheckBox Chromagram ChuaL CircleRamp Class ClassBrowser 
            ClassInspector CleanupStream ClearBuf Clip ClipNoise Clipper32 Clipper4 
            Clipper8 Clock Clockmus CmdPeriod CoinGate CollStream Collection Color 
            CombC CombL CombLP CombN Compander CompanderD Complex ComplexRes 
            CompositeView Concat Concat2 Condition ContiguousBlock 
            ContiguousBlockAllocator Control ControlDur ControlName ControlRate 
            ControlSpec Convolution Convolution2 Convolution2L Convolution3 CosineWarp 
            Coyote Crackle Crest CrossoverDistortion CurveWarp CuspL CuspN DC DFM1 
            DNoiseRing DPW3Tri DPW4Saw DUGen DWGBowed DWGBowedSimple DWGBowedTor 
            DWGPlucked DWGPlucked2 DWGPluckedStiff DWGSoundBoard Date DbFaderWarp 
            Dbrown Dbrown2 DbufTag Dbufrd Dbufwr Dconst DebugFrame DebugNodeWatcher 
            Decay Decay2 Decimator DecodeB2 Decorator DegreeToKey DelTapRd DelTapWr 
            Delay1 Delay2 DelayC DelayL DelayN DelayWr Demand DemandEnvGen 
            DeprecatedError DetaBlockerBuf DetectIndex DetectSilence Dfsm Dgauss Dgeom 
            Dialog Dibrown Dictionary DiodeRingMod Disintegrator DiskIn DiskOut Diwhite 
            Dneuromodule Document DoesNotUnderstandError Donce Done DoubleArray 
            DoubleNestedAllpassC DoubleNestedAllpassL DoubleNestedAllpassN DoubleWell 
            DoubleWell2 DoubleWell3 Download Dpoll DragBoth DragSink DragSource 
            DragView Drand DrawGrid DrawGridX DrawGridY Dreset DriveNoise DrumTrack 
            Dseq Dser Dseries Dshuf Dstutter Dswitch Dswitch1 Dtag Dunique Dust Dust2 
            Duty Dwhite Dwrand Dxrand DynKlang DynKlank EZControlSpecEditor EZGui 
            EZKnob EZListView EZLists EZNumber EZPopUpMenu EZRanger EZScroller 
            EZSlider EZText EmbedOnce Env EnvDetect EnvFollow EnvGate EnvGen 
            EnvelopeView EnvirGui Environment EnvironmentRedirect Error Event 
            EventPatternProxy EventStreamCleanup EventStreamPlayer EventTypesWithCleanup 
            Exception ExpRand ExponentialWarp FBSineC FBSineL FBSineN FFT FFTCentroid 
            FFTComplexDev FFTCrest FFTDiffMags FFTFlux FFTFluxPos FFTMKL FFTPeak 
            FFTPhaseDev FFTPower FFTSlope FFTSpread FFTSubbandFlatness FFTSubbandFlux 
            FFTSubbandPower FFTTrigger FM7 FMGrain FMGrainB FMGrainBBF FMGrainBF 
            FMGrainI FMGrainIBF FMHDecode1 FMHEncode0 FMHEncode1 FMHEncode2 FOS 
            FSinOsc FaderWarp False Fdef FeatureSave Feedback Fhn2DC Fhn2DL Fhn2DN 
            FhnTrig File FileDialog FileReader Filter FilterPattern Finalizer 
            FincoSprottL FincoSprottM FincoSprottS FitzHughNagumo Float FloatArray 
            FlowLayout FlowVar FlowView FlowViewLayout Foa FoaAsymmetry FoaBalance 
            FoaDecode FoaDecoderKernel FoaDecoderMatrix FoaDirect FoaDirectO FoaDirectX 
            FoaDirectY FoaDirectZ FoaDominate FoaDominateX FoaDominateY FoaDominateZ 
            FoaEncode FoaEncoderKernel FoaEncoderMatrix FoaFocus FoaFocusX FoaFocusY 
            FoaFocusZ FoaMirror FoaNFC FoaPanB FoaPress FoaPressX FoaPressY FoaPressZ 
            FoaProximity FoaPsychoShelf FoaPush FoaPushX FoaPushY FoaPushZ FoaRTT 
            FoaRotate FoaSpeakerMatrix FoaTilt FoaTransform FoaTumble FoaUGen FoaXform 
            FoaXformerMatrix FoaZoom FoaZoomX FoaZoomY FoaZoomZ Fold Font Formant 
            FormantTable Formlet Frame FrameCompare FrameInspector Free FreeSelf 
            FreeSelfWhenDone FreeVerb FreeVerb1 FreeVerb2 FreqScope FreqScopeView 
            FreqScopeWindow FreqShift Friction FuncFilterPattern FuncStream 
            FuncStreamAsRoutine Function FunctionDef FunctionDefInspector FunctionList 
            GUI GVerb Gammatone Gate GaussClass GaussTrig Gbman2DC Gbman2DL Gbman2DN 
            GbmanL GbmanN GbmanTrig Gendy1 Gendy2 Gendy3 Gendy4 Gendy5 Getenv Git 
            GlitchBPF GlitchBRF GlitchHPF GlitchRHPF Goertzel Gradient GrainBuf 
            GrainBufJ GrainFM GrainFMJ GrainIn GrainInJ GrainSin GrainSinJ GraphBuilder 
            GravityGrid GravityGrid2 GrayNoise Greyhole GreyholeRaw GridLayout 
            GridLines Group HDR HID HIDCollection HIDDeviceDispatcher HIDElement 
            HIDElementDispatcher HIDElementProto HIDElementProtoDispatcher HIDFunc 
            HIDFuncDeviceProtoMatcher HIDFuncElementProtoMatcher HIDInfo HIDProto 
            HIDRawValueMatcher HIDUsage HIDUsageDispatcher HIDValueMatcher HIDdef 
            HLayout HLayoutView HPF HPZ1 HPZ2 HairCell Harmonics Hasher Help 
            HelpBrowser Henon2DC Henon2DL Henon2DN HenonC HenonL HenonN HenonTrig 
            HighShelf Hilbert HilbertFIR HiliteGradient History HistoryGui ICepstrum 
            IEnvGen IFFT IIRFilter IODesc IOStream IRand IdentityBag IdentityDictionary 
            IdentitySet Image ImmutableError Impulse In InBus InFeedback InGrain 
            InGrainB InGrainBBF InGrainBF InGrainI InGrainIBF InRange InRect InTrig 
            Index IndexInBetween IndexL InfoUGenBase InsideOut Inspector Instruction 
            Int16Array Int32Array Int8Array Integer Integrator InterPoint Interpl 
            InterplChord InterplEnv InterplPairs InterplXYC Interpreter Interval 
            ItemViewBase JITGui JPverb JPverbRaw JoshGrain JoshMultiChannelGrain 
            JoshMultiOutGrain K2A KMeansRT KeyClarity KeyMode KeyState KeyTrack 
            Klang Klank KmeansToBPSet1 Knob LADSPA LFBrownNoise0 LFBrownNoise1 
            LFBrownNoise2 LFClipNoise LFCub LFDClipNoise LFDNoise0 LFDNoise1 
            LFDNoise3 LFGauss LFNoise0 LFNoise1 LFNoise2 LFPar LFPulse LFSaw 
            LFTri LID LIDAbsInfo LIDAbsSlot LIDGui LIDInfo LIDKeySlot LIDLedSlot 
            LIDMscSlot LIDRelSlot LIDSlot LPCAna LPCAnalyzer LPCError LPCFile 
            LPCSynth LPCVals LPF LPF1 LPF18 LPFVS6 LPZ1 LPZ2 LRHPF LRLPF 
            LRUNumberAllocator LTI Lag Lag2 Lag2UD Lag3 Lag3UD LagControl LagIn LagUD 
            LanguageConfig LastValue Latch Latoocarfian2DC Latoocarfian2DL 
            Latoocarfian2DN LatoocarfianC LatoocarfianL LatoocarfianN LatoocarfianTrig 
            Layout LazyEnvir LeakDC LeastChange LevelIndicator Library LibraryBase 
            LimitedWriteStream Limiter LinCongC LinCongL LinCongN LinExp LinLin LinPan2 
            LinRand LinSelectX LinXFade2 Line LineLayout LinearWarp Linen LinkedList 
            LinkedListNode LinuxPlatform List ListDUGen ListPattern ListTrig ListTrig2 
            ListView LocalBuf LocalIn LocalOut Logger Logistic LoopBuf Lorenz2DC 
            Lorenz2DL Lorenz2DN LorenzL LorenzTrig Loudness LowShelf MCLDChaosGen 
            MFCC MIDIClient MIDIEndPoint MIDIEvent MIDIFunc MIDIFuncBothCAMessageMatcher 
            MIDIFuncBothMessageMatcher MIDIFuncChanArrayMessageMatcher 
            MIDIFuncChanMessageMatcher MIDIFuncSrcMessageMatcher 
            MIDIFuncSrcMessageMatcherNV MIDIFuncSrcSysMessageMatcher 
            MIDIFuncSrcSysMessageMatcherND MIDIIn MIDIMTCtoSMPTEDispatcher 
            MIDIMessageDispatcher MIDIMessageDispatcherNV MIDIOut MIDIResponder 
            MIDISMPTEAssembler MIDISysDataDispatcher MIDISysDataDropIndDispatcher 
            MIDISysNoDataDispatcher MIDISysexDispatcher MIDIValueMatcher 
            MIDIdef Magnitude Main MantissaMask MarkovSynth MatchingP 
            MatchingPResynth Max MaxLocalBufs Maxamp Maybe MdaPiano MeanTriggered 
            Meddis Median MedianSeparation MedianTriggered MembraneCircle 
            MembraneHexagon Message Method MethodError MethodInspector MethodOverride 
            MethodQuote Metro MidEQ 

            MiBraids MiClouds MiElements MiGrids MiMu MiOmi MiPlaits 
            MiRings MiRipples MiTides MiVerb MiWarps 

            Mix MixedBundle ModDif Module Monitor MonitorGui 
            MonoGrain MonoGrainBF MoogFF MoogLadder MoogVCF MostChange MouseButton 
            MouseX MouseY MulAdd MultiLevelIdentityDictionary MultiOutDemandUGen 
            MultiOutUGen MultiSliderView MultiTap MustBeBooleanError NAryOpFunction 
            NAryOpFunctionProxy NAryOpStream NAryValueProxy NL NL2 NLFiltC NLFiltL 
            NLFiltN NRand NTube NamedControl Ndef NdefGui NdefMixer NdefParamGui 
            NearestN NeedleRect NestedAllpassC NestedAllpassL NestedAllpassN 
            NetAddr Nil Node NodeControl NodeID NodeIDAllocator NodeMap NodeProxy 
            NodeProxyEditor NodeWatcher Normalizer NotYetImplementedError Notch 
            NoteOffResponder NoteOnResponder NotificationCenter 
            NotificationRegistration NumAudioBuses NumBuffers NumChannels 
            NumControlBuses NumInputBuses NumOutputBuses NumRunningSynths 
            Number NumberBox OSCArgsMatcher OSCBundle OSCFunc 
            OSCFuncAddrMessageMatcher OSCFuncBothMessageMatcher 
            OSCFuncRecvPortMessageMatcher OSCMessageDispatcher 
            OSCMessagePatternDispatcher OSCMultiResponder OSCdef OSCpathDispatcher 
            OSCpathResponder OSCresponder OSCresponderNode OSFold4 OSFold8 OSTrunc4 
            OSTrunc8 OSWrap4 OSWrap8 Object ObjectGui ObjectInspector ObjectTable 
            OffsetOut OnError OnePole OneShotStream OneZero OnsetStatistics Onsets 
            OnsetsDS Order OrderedIdentitySet Oregonator Osc OscN OteyPiano 
            OteyPianoStrings OteySoundBoard Out OutOfContextReturnError OutputProxy 
            OverlapTexture PAbstractGroup PMOsc PSinGrain PVAna PVFile PVInfo PVSynth 
            PV_Add PV_BinBufRd PV_BinDelay PV_BinFilter PV_BinPlayBuf PV_BinScramble 
            PV_BinShift PV_BinWipe PV_BrickWall PV_BufRd PV_ChainUGen PV_CommonMag 
            PV_CommonMul PV_Compander PV_ConformalMap PV_Conj PV_Copy PV_CopyPhase 
            PV_Cutoff PV_DiffMags PV_Diffuser PV_Div PV_EvenBin PV_ExtractRepeat 
            PV_Freeze PV_FreqBuffer PV_HainsworthFoote PV_Invert PV_JensenAndersen 
            PV_LocalMax PV_MagAbove PV_MagBelow PV_MagBuffer PV_MagClip PV_MagDiv 
            PV_MagExp PV_MagFreeze PV_MagGate PV_MagLog PV_MagMap PV_MagMinus PV_MagMul 
            PV_MagMulAdd PV_MagNoise PV_MagScale PV_MagShift PV_MagSmear PV_MagSmooth 
            PV_MagSquared PV_MagSubtract PV_Max PV_MaxMagN PV_Min PV_MinMagN 
            PV_Morph PV_Mul PV_NoiseSynthF PV_NoiseSynthP PV_OddBin PV_PartialSynthF 
            PV_PartialSynthP PV_PhaseShift PV_PhaseShift270 PV_PhaseShift90 
            PV_PitchShift PV_PlayBuf PV_RandComb PV_RandWipe PV_RecordBuf PV_RectComb 
            PV_RectComb2 PV_SoftWipe PV_SpectralEnhance PV_SpectralMap PV_Whiten 
            PV_XFade PackFFT Padd Paddp Paddpre PageLayout Pair Pan2 Pan4 PanAz 
            PanB PanB2 PanX PanX2D ParGroup ParamView PartConv PathName Pattern 
            PatternConductor PatternControl PatternProxy Pause PauseSelf 
            PauseSelfWhenDone PauseStream Pavaroh Pbeta Pbind PbindProxy Pbindef 
            Pbindf Pbinop Pbrown Pbus Pcauchy Pchain Pclump Pclutch Pcollect 
            Pconst Pdef PdefAllGui PdefGui Pdefn PdefnAllGui PdefnGui PdegreeToKey 
            Pdfsm Pdict Pdiff Pdrop PdurStutter Peak PeakEQ2 PeakEQ4 PeakFollower 
            Pen Penv Penvir Perlin3 Pevent Peventmod Pexprand PfadeIn PfadeOut Pfhn 
            Pfin PfinQuant Pfindur Pfinval Pflatten Pfpar Pfset Pfsm Pfunc Pfuncn 
            Pfx Pfxb Pgate Pgauss Pgbman Pgbrown Pgeom Pget Pgpar Pgroup Pgtpar 
            Phaser Phasor Phenon Phprand Phrase Pif Pindex PingPong PinkNoise Pipe 
            Pitch PitchShift Pkey Place Plag Plambda PlaneTree Platform Platoo 
            Play PlayBuf Player Plazy PlazyEnvir PlazyEnvirN Plet PlinCong Plorenz 
            Plot Plotter Plprand Pluck PlusFreqScope PlusFreqScopeView 
            PlusFreqScopeWindow Pmeanrand Pmono PmonoArtic PmonoArticStream 
            PmonoStream Pmul Pmulp Pmulpre Pn Pnaryop Pnsym Pnsym1 Point PointArray 
            PointSource Polar Poll PopUpMenu PosRatio Post PowerOfTwoAllocator 
            PowerOfTwoBlock Ppar PparGroup Ppatlace Ppatmod Pplayer Ppoisson Pprob 
            Pprotect Pproto Pquad Prand Preject Pretty PrettyEat PrettyEcho 
            PrettyState Prewrite PrimitiveFailedError PrintVal PriorityQueue 
            ProcEvents ProcMod ProcModR ProcProcessor ProcSFPlayer ProcSink Process 
            ProgramChangeResponder Prorate Prout Proutine ProxyMixer ProxyMonitorGui 
            ProxyNodeMap ProxySpace ProxySynthDef Pseed Pseg Pselect Pseq Pser Pseries 
            Pset Psetp Psetpre Pshuf Pslide Pspawn Pspawner Pstandard Pstep Pstep2add 
            Pstep3add PstepNadd PstepNfunc Pstretch Pstretchp Pstutter Pswitch 
            Pswitch1 Psym Psym1 Psync Ptime Ptpar Ptrace Ptsym Ptuple Pulse PulseCount 
            PulseDPW PulseDivider Punop PureMultiOutUGen PureUGen Pwalk Pwhile 
            Pwhite Pwrand Pwrap Pxrand QAbstractScroll QAbstractStepValue QAlignment 
            QButton QCheckBox QColorGroup QColorRole QCurve QDialog QDragBoth 
            QDragSink QDragSource QDragView QEnvelopeView QFileDialog QFont QGridLayout 
            QHLayout QHLayoutView QImage QItemViewBase QKey QKeyModifiers QKnob QLayout 
            QLevelIndicator QLevelIndicatorStyle QLimits QLineLayout QListView 
            QMetaObject QMultiSliderView QNumberBox QObject QOrientation QPalette QPen 
            QPenPrinter QPopUpMenu QQuartzComposerView QRangeSlider QScope QScope2 
            QScrollCanvas QScrollTopView QScrollView QSlider QSlider2D QSoundFileView 
            QStackLayout QStaticText QStethoscope QTextField QTextView QTextViewBase 
            QTopScrollWidget QTopView QTreeView QTreeViewItem QUserView QVLayout 
            QVLayoutView QView QWebFontFamily QWebView QWindow Qitch QtGUI QuadC 
            QuadL QuadN Quant Quark QuarkDetailView QuarkRowView Quarks QuarksGui 
            QuartzComposerView RBJHighShelf RBJLowShelf RBJNotch RHPF RLPF RLPFD 
            RMAFoodChainL RMEQ RMEQSuite RMShelf RMShelf2 RPlay RadiansPerSample 
            Ramp Rand RandID RandSeed Range RangeSlider RawArray RawPointer RecNodeProxy 
            RecordBuf Rect Ref RefCopy Reflections RegaliaMitraEQ ReplaceOut Resonz 
            Rest RingBuffer RingNumberAllocator Ringz RootNode RosslerL RosslerResL 
            Rotate Rotate2 Routine RunningMax RunningMin RunningSum SCContainerView 
            SCDoc SCDocEntry SCDocHTMLRenderer SCDocNode SCEnvelopeEdit SCScope 
            SCViewHolder SCVim SFPlay SLOnset SMS SOMAreaWr SOMRd SOMTrain SOS SVF 
            SampleDur SampleRate Saw SawDPW Scale ScaleAD ScaleInfo ScaleLP 
            ScaleStream Scheduler Schmidt Scope2 ScopeBuffer ScopeOut ScopeOut2 
            ScopeView Score ScoreStreamPlayer ScrollCanvas ScrollTopView ScrollView 
            Select SelectX SelectXFocus Semaphore SemiColonFileReader SendPeakRMS 
            SendReply SendTrig SensoryDissonance SequenceableCollection Sequencer 
            SerialPort Server ServerBoot ServerMeter ServerMeterView ServerOptions 
            ServerQuit ServerShmInterface ServerTree Set SetBuf SetResetFF Shaper 
            SharedIn SharedOut Shift90 ShouldNotImplementError ShutDown Sieve1 Signal 
            Silent SimpleController SimpleNumber SinGrain SinGrainB SinGrainBBF 
            SinGrainBF SinGrainI SinGrainIBF SinOsc SinOscFB SinTone SineShaper SineWarp 
            Size SkipJack SkipNeedle Slew Slider Slider2D Slope SlotInspector 
            SmoothDecimator SoftClipAmp SoftClipAmp4 SoftClipAmp8 SoftClipper4 
            SoftClipper8 SortBuf SortedList SoundFile SoundFileView SoundIn SparseArray 
            Spawner Speakers Spec SpecCentroid SpecFlatness SpecPcile SpectralEntropy 
            Speech Spkr Splay SplayAz SplayZ Spreader Spring SpruceBudworm Squiz 
            StackLayout StackNumberAllocator Standard2DC Standard2DL Standard2DN 
            StandardL StandardN StandardTrig StartUp StaticText Stepper StereoConvolution2L 
            Stethoscope Stk StkBandedWG StkBeeThree StkBlowHole StkBowed StkBowedI 
            StkClarinet StkFlute StkGlobals StkInst StkMandolin StkModalBar StkMoog 
            StkPluck StkSaxofony StkShakers StkVoicForm Stream StreamClutch StreamControl 
            Streson String StringGui StringInspector SubclassResponsibilityError 
            SubsampleOffset Sum3 Sum4 Summer Sweep Switch Switch1 SwitchDelay Symbol 
            SymbolArray SyncSaw Synth SynthControl SynthDef SynthDefControl SynthDefOld 
            SynthDesc SynthDescLib SystemClock SystemSynthDefs T2A T2K TBall TBetaRand 
            TBrownRand TChoose TDelay TDuty TDuty_old TExpRand TGaussRand TGrains TGrains2 
            TGrains3 TIRand TPV TRand TTendency TWChoose TWindex TabFileReader 
            TabletSlider2D TabletView Tap TapN Tartini Task TaskProxy TaskProxyAllGui 
            TaskProxyGui Tdef TdefAllGui TdefGui TempoBusClock TempoClock TermanWang 
            TestDependant TextArchiveMDPlugin TextField TextVU TextView TextViewBase 
            Thread Thunk Tilt Timer ToggleFF TopScrollWidget TopView TouchResponder 
            TreeView TreeViewItem Trig Trig1 TrigAvg TrigControl True Tumble Tuning 
            TuningInfo TwoPole TwoTube TwoWayIdentityDictionary TwoZero UGen UGenThunk 
            UHJ2B UHJtoB URI UnaryOpFunction UnaryOpFunctionProxy UnaryOpPlug 
            UnaryOpStream UnaryOpUGen UniqueID Unix UnixFILE UnixPlatform Unpack1FFT 
            UnpackFFT UserView VBAP VBAPSpeaker VBAPSpeakerArray VBAPSpeakerSet VDiskIn 
            VLayout VLayoutView VMScan2D VOSIM VOsc VOsc3 VarLag VarSaw Vibrato View 
            ViewRedirect Vocode VocodeBand Vocoder Volume VolumeGui WAmp WalshHadamard 
            Warp Warp1 WarpOverlap WarpZ Watcher WaveLoss WaveTerrain WaveletDaub 
            Wavetable WeaklyNonlinear WeaklyNonlinear2 WebView WhiteNoise WidthFirstUGen 
            WiiCalibrationInfo WiiMote WiiMoteGUI WiiMoteIRObject WiiNunchukGUI 
            WiiRemoteGUI Window Wrap WrapIndex WrapSummer XFade2 XIn XInFeedback 
            XLine XOut ZHPF ZLPF ZPoint ZPolar ZeroCrossing
            `,
            literal: 'true false'
        },
        illegal: '"',
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.C_NUMBER_MODE,
            hljs.QUOTE_STRING_MODE,
            {
                className: 'meta',
                begin: '#',
                end: '$'
            }
        ]
    };
};